/**
* @file Input validation and replacement scripts
* @module helpers/inputs
*/
const { isFolder } = require('./folders.js');

// Valid option values
const VALID_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'tiff', 'svg'];
const VALID_FITS = ['cover', 'contain', 'fill', 'inside', 'outside'];
const VALID_POSITIONS = ['top', 'right top', 'right', 'right bottom', 'bottom', 'left bottom', 'left', 'left top', 'north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest', 'center', 'centre', 'entropy', 'attention'];

/**
 * Checks if fit matches valid fit values constant.
 * @private
 *
 * @param {string} fit Fit string to compare.
 *
 * @returns {boolean} Returns true if any valid fit matches.
 */
const isValidFit = (fit) => VALID_FITS.includes(fit);

/**
 * Checks if position matches valid position values constant and fit is correct.
 * @private
 *
 * @param {string} positoon Fit string to compare.
 * @param {string} fit Fit option to compare.
 *
 * @returns {boolean} Returns true if any position matches for valid fit.
 */
function isValidPosition(position, fit) {
  if (fit !== ('cover' || 'contain')) return false;
  if ((position === ('entropy' || 'attention') && fit !== 'cover')) return false;
  return VALID_POSITIONS.includes(position);
}

/**
 * Checks if extension matches valid extensions values constant.
 * @private
 *
 * @param {string} extension Extension string to compare.
 *
 * @returns {boolean} Returns true if any valid extension matches.
 */
const isValidExtension = (extension) => VALID_EXTENSIONS.includes(extension.trim());

/**
 * Validates input options.
 * @private
 *
 * @param {string} fit How to resize the image to fit provided dimensions.
 * @param {string} position How to position image when using cover or contain.
 * @param {boolean} enlarge If false images will be enlarged to fit required sizes.
 *
 * @returns {{fit?:string, position?:string, withoutEnlargement?:boolean}}
 * Object containing additional sharp options
 */
function validateOptions(fit, position, enlarge = true) {
  const validOptions = {};
  // Confirm fit value is valid.
  if (isValidFit(fit)) validOptions.fit = fit;
  // Confirm position value is falid for fit.
  if (isValidPosition(position, validOptions.fit)) validOptions.position = position;
  // Prevent enlargment if requested.
  if (!enlarge || enlarge === 'false') validOptions.withoutEnlargement = true;
  return validOptions;
}

/**
 * Returns an array of valid dimensions contained in input.
 * @private
 *
 * @param {number|string|Array<string|number>} _sizes An array of possible dimensions,
 * a comma-delimited string or a single string or number. If a dimension contains 'x'
 * it will be a delimiter for output thumbnail width and height.
 *
 * @returns {{width?:number, height?:number}[]} A filtered array of optional width and height pairs.
 * @throws {Error} No valid sizes found in input.
 */
function validateDimensions(_sizes) {
  const validDimensions = [];
  // Check if we're passed a comma-delimited string.
  let sizes = _sizes.includes(',') ? _sizes.split(',') : _sizes;
  // Convert into array if passed a non-delimited string.
  if (!Array.isArray(sizes)) sizes = [sizes];

  sizes.forEach((size) => {
    const dimensions = {};
    // Prepare the output object.
    if (size.toLowerCase().startsWith('x')) {
      // Input is a string with height only (eg. x280).
      dimensions.height = size.split('x').join('');
    } else if (size.toLowerCase().includes('x')) {
      // Input is a string with both dimensions (eg. 320X280).
      [dimensions.width, dimensions.height] = size.split('x');
    } else {
      dimensions.width = size; // Input is a width only string (no "x").
    }
    // Check all values are valid
    if (dimensions.width && !Number.isNaN(parseInt(dimensions.width, 10))) {
      dimensions.width = parseInt(dimensions.width, 10); // Width is a valid number.
    }
    if (dimensions.height && !Number.isNaN(parseInt(dimensions.height, 10))) {
      dimensions.height = parseInt(dimensions.height, 10); // Height is a valid number.
    }
    // Use any valid width or height.
    if (dimensions.height || dimensions.width) {
      validDimensions.push(dimensions);
    }
  });

  if (!validDimensions.length) { // Error out if no valid dimensions found.
    throw new Error(`No valid sizes in input argument: ${_sizes}!`);
  }
  return validDimensions;
}

/**
 * Returns an array of sharp options for each size.
 *
 * @param {number|string|Array<string|number>} sizes An array of possible dimensions,
 * a comma-delimited string or a single string or number. If a dimension contains 'x'
 * it will be a delimiter for output thumbnail width and height.
 * @param {string} fit Sharp 'fit' option setting
 * @param {string} position Sharp 'position' option setting
 * @param {boolean} enlarge Sharp 'withoutEnlargement' option setting
 *
 * @returns {Array} An array of valid sharp option objects.
 */
function validateSizes(sizes, fit, position, enlarge) {
  const options = validateOptions(fit, position, enlarge);
  const dimensions = validateDimensions(sizes);

  return dimensions.map((dimension) => ({ ...dimension, ...options }));
}

/**
 * Check all input extensions are valid.
 *
 * @param {string|Array<string>} extensions An array or string of possible extensions.
 *
 * @returns {Array<string>} An array of valid extensions.
 * @throws {Error} Invalid image extension in input.
 */
function validateExtensions(extensions) {
  let validExtensions = extensions.includes(',') ? extensions.split(',') : extensions;
  validExtensions = Array.isArray(validExtensions) ? validExtensions : [validExtensions];
  validExtensions = validExtensions.map((extension) => extension.split('.').join('').trim());
  if (!validExtensions.every(isValidExtension)) {
    throw new Error(`${extensions} includes an invalid image extension, valid values: ${VALID_EXTENSIONS}`);
  }
  return validExtensions;
}

/**
 * Validates input folder exits and is a directory.
 * @async
 *
 * @param {string} path Source folder input argument.
 *
 * @returns {string} Validated folder path
 * @throws {Error} Input source path folder doesn't exist.
 */
async function validateFolder(path) {
  if (await isFolder(path)) { // Confirm input folder exists.
    return path;
  }
  throw new Error(`Input folder '${path}' doesn't exist!`);
}

/**
 * Will expand variable placholders with provided values.
 *
 * @param {string} pattern A string pattern containing % variable placeholders.
 * @param {{width?: number, height?: number}} dimensions Width and height object.
 * @param {string} [filename=''] Optional filename to use in output string.
 *
 * @returns {string} String with expanded variable values.
 */
function expandVariables(pattern, dimensions, filename = '') {
  const { height, width } = dimensions;
  const [basename, extension] = filename.split('.');

  return pattern.split('%W').join(width || '').split('%H').join(height || '')
    .split('%D')
    .join(width || height || '')
    .split('%N')
    .join(basename)
    .split('%E')
    .join(extension)
    .split('%F')
    .join(filename)
    .trim();
}

exports.validateFolder = validateFolder;
exports.validateExtensions = validateExtensions;
exports.validateSizes = validateSizes;
exports.expand = expandVariables;

/**
 * @file Main action script with helper imports.
 */
const core = require('@actions/core'); // https://github.com/actions/toolkit
const {
  validateExtensions,
  validateSizes,
  validateFolder,
  expand,
} = require('./helpers/inputs.js');
const {isFolder, getFiles, createFolder} = require('./helpers/folders.js');
const resizeImage = require('./helpers/images.js');

/**
 * Generates images thumbnail files.
 *
 * @param {string} _source Source folder input argument.
 * @param {string} _output Container folder path for thumbnail files and folders.
 * @param {number|string|Array<string|number>} [_sizes] An array, comma-delimited
 * string of possible dimensions or a single string or number. If a dimension
 * contains 'x' it will be a delimiter for output thumbnail width and height.
 * @param {string|Array<string>} [_extensions] Image extensions input argument.
 * @param {string} [_subfolder] Subfolder name or name pattern.
 * @param {string} [_filename] Thumbnail filename name or filename pattern.
 * @param {string} [_fit] How to resize the image to fit provided dimensions.
 * @param {string} [_position] How to position image when using cover or contain.
 * @param {boolean} [_enlarge=true] If image should be enlarged to fit provided sizes.
 * @param {boolean} [_overwrite=false] If existing thumbnails should be overwritten.
 *
 * @returns {Promise} Promise object object of all image processing task promises.
 */
async function generateThumbnails(
  _source,
  _output,
  _sizes,
  _extensions,
  _subfolder,
  _filename,
  _fit,
  _position,
  _enlarge,
  _overwrite
) {
  // Validate inputs.
  const source = await validateFolder(_source);
  const overwrite =
    _overwrite === true || _overwrite.toString().toLowerCase() === 'true';
  const extensions = validateExtensions(_extensions);
  const sizes = validateSizes(_sizes, _fit, _position, _enlarge);
  const tasks = []; // Output array.

  // Create image resize tasks for each requited thumbnail size.
  await Promise.all(
    sizes.map(async (options) => {
      // Helper scripts
      const filename = (file) => expand(_filename, options, file);
      const getImages = async (folder) => getFiles(folder, extensions);
      // Output variables for processing script.
      const output =
        _subfolder === false || _subfolder.toString().toLowerCase() === 'false'
          ? _output
          : `${_output}/${expand(_subfolder, options)}`;
      let images = await getImages(source);

      // If output folder doesn't exist, create it recursively.
      if (!(await isFolder(output))) {
        await createFolder(output);
        // Ignore existing images if not called with overwrite option.
      } else if (!overwrite) {
        const thumbnails = await getImages(output);
        images = images.filter(
          (image) => thumbnails.indexOf(filename(image)) === -1
        );
      }
      // Push image resize task to output array.
      images.forEach((image) =>
        tasks.push(
          resizeImage(
            `${source}/${image}`,
            options,
            `${output}/${filename(image)}`
          )
        )
      );
    })
  );

  return Promise.all(tasks); // Promise all resizeImage tasks.
}

// Main function call with fallback defaults.
generateThumbnails(
  // Get input arguments from action call and replace missing with defaults:
  core.getInput('source') || 'images', // Input images path, throws error if not a folder.
  core.getInput('output') || 'thumbnails', // Output path, will be created recursively.
  core.getInput('sizes') || 480, // Thumbnail dimensions, comma-delimited string or array.
  core.getInput('extensions') || ['jpg', 'jpeg', 'png', 'webp', 'gif', 'tiff'],
  // Image extensions, possible values: 'jpg', 'jpeg', 'png', 'webp', 'gif', 'tiff', 'svg'
  core.getInput('subfolder') || '%D', // '' or subfolder pattern with replace variables:
  // %W = image width, %H = image height, %D = image width or height (default)
  core.getInput('filename') || '%F', // Filename pattern with above replace variables and:
  // %F = %N%E = input filename (default), %N = basename, %E = extension
  // If only one dimension value is provided it will be treated as width.
  core.getInput('fit') || 'cover', // How the image should be resized to dimensions
  // Possible values: cover (default), contain, fill, inside, outside.
  core.getInput('position') || 'center',
  // Position, gravity or strategy for fit: cover or contain.
  // Options: top, right top, right, right bottom, bottom, left bottom, left, left top,
  // north, northeast, east, southeast, south, southwest, west, northwest, center,
  // centre (default), entropy (fit: cover only), attention (fit: cover only)
  core.getInput('enlarge') || true, // Enlarge smaller images to thumbnail dimensions.
  core.getInput('overwrite') // Overwrite existing thumbnails (default: false).
).catch((error) => core.setFailed(` ${error.message}`)); // Any error should fail action.

// Export the thumbnails container folder to be used as env variable (eg. for commits)
core.setOutput('thumbnails', core.getInput('output'));

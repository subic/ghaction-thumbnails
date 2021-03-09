/**
 * @file Image processing task for main script, uses sharp.
 * @module helpers/images
 */
const sharp = require('sharp'); // https://github.com/lovell/sharp

/**
 * Resizes an image file using sharp.
 *
 * @param {string} input Input file path.
 * @param {Object} options Sharp settings for resize.
 * @param {number} [options.width] Output image width.
 * @param {number} [options.height] Output image height.
 * @param {string} [options.fit] How to resize the image to fit provided dimensions.
 * @param {string} [options.position] How to position image when using cover or contain.
 * @param {boolean} [options.withoutEnlargement=false] If true don't enlarge small images.
 * @param {string} output Output filename path.
 *
 * @returns {Promise} Sharp promise object, will log success to console.
 */
const resizeImage = (input, options, output) =>
  sharp(input)
    .resize(options)
    .jpeg({quality: 80, progressive: true, force: false})
    .toFile(output)
    .then(() => console.log(`Processed thumbnail ${output}`));

module.exports = resizeImage;

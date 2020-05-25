/**
* @file Helper functions for node fs folder handling with promises.
* @module helpers/folders
*/
const { lstat, opendir, mkdir } = require('fs').promises;

/**
 * Checks if filename matches extension.
 * @private
 *
 * @param {string} file Filename to compare with, case insensitve.
 * @param {string} extension Extension, dot prefix optional, case insensitve.
 *
 * @returns {boolean} Returns true if filename has a matching extension.
 */
function hasExtension(file, extension) {
  const filename = file.toString().toLowerCase();
  const suffix = extension.toString().trim().toLowerCase().split('.')
    .join('');
  return filename.endsWith(`.${suffix}`);
}

/**
 * Checks if path exists and is a folder.
 * @async
 *
 * @param {string} folder Path to check.
 *
 * @returns {boolean} Returns true if path is an existing folder.
 */
async function isFolder(folder) {
  try {
    const stat = await lstat(folder);
    return stat.isDirectory();
  } catch (error) {
    return false;
  }
}

/**
 * Lists all files in a given folder, optionally filtered by extension.
 * @async
 *
 * @param {string} folder Folder path.
 * @param {Array<string>} [extensions] Array of possible matching extensions.
 *
 * @returns {Array<string>} Returns an array of files, no subfolders.
 */
async function getFiles(folder, extensions = []) {
  const dir = await opendir(folder);
  const files = [];
  // Disabling eslint no regenerators as they are faster when working with large folders.
  // eslint-disable-next-line no-restricted-syntax
  for await (const dirent of dir) {
    if (!dirent.isDirectory()) {
      const filename = dirent.name;
      // If passsed any extensions return only matching filenames.
      if (!extensions.length || extensions.some((extension) => hasExtension(filename, extension))) {
        files.push(filename);
      }
    }
  }
  return files;
}

/**
 * Recuresively creates a folder.
 * @async
 *
 * @param {string} folder Folder path.
 *
 * @returns {Promise} fs.mkdir promise object.
 */
async function createFolder(path) {
  await mkdir(path, { recursive: true });
}

exports.isFolder = isFolder;
exports.getFiles = getFiles;
exports.createFolder = createFolder;

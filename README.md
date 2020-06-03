# Thumbnails Generator GitHub Action
### Automatically generate image thumbnails when images are added to the repository.

<p align="center">
  <img src="data:image/png;base64,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"
</p>

* [Usage](#usage)
    * [Inputs](#inputs)
    * [Outputs](#outputs)
    * [Example usage](#example-usage)
    * [Notes](#notes)
* [Development](#development)
    * [Repo structure](#repo-structure)
    * [Image processing task modifications](#image-processing-task-modifications)
    * [Build and compile](#build-and-compile)
    * [Dependencies](#dependencies)
    * [Alternatives](#alternatives)
    * [Contributions](#contributions)
    * [License](#license)

## Usage

To add the thumbnail generator to your GitHub Actions pipeline, specify the name of this repository, optionally with a tag number (`@v1` is the current version) as a `step` within your `workflow.yml` file.

Inside your `.github/workflows/workflow.yml` file:

```yaml
steps:
- uses: actions/checkout@master
- uses: subic/ghaction-thumbnails@master
  with: # Required arguments:
    source: 'images' # Input images folder, required both as an argument and as an existing directory path in repository which is also the reason for the previous checkout step (default: 'images').
    output: 'thumbnails' # Output thumbnails container folder, can be same as input or base directory, if the directory doesn't exist it will be created recursively (default: 'thumbnails').
    sizes: 480 # Output widths or dimensions separated with an 'x', can be a number or a comma-delimited string. Prefix height only sizes with 'x' when not setting widths; eg. "x360, x1080" (default: 480)).
```
>**Note**: The action is meant to be used in a (web assets) build chain so it only exposes the output directory and its contents to other GitHub actions. When using as a separate or individual build action, you will probably want to commit the generated image files. See the [full example workflow file](#example-workflowyml) below or the [example repository](https://github.com/subic/ghaction-thumbnails-example) for details.

### Inputs

The action supports 10 input arguments ([`source`](#source), [`output`](#output), [`sizes`](#sizes), [`subfolder`](#subfolder), [`filename`](#filename), [`extensions`](#extensions), [`fit`](#fit), [`position`](#position), [`enlarge`](#enlarge) and [`overwrite`](#overwrite)) but only the first three are required and validated. When others are omitted or wrong the action tries to defensively fall back onto sensible defaults which still generate useful images but it will error out on some illegal arguments. The images are processed using [sharp](https://github.com/lovell/sharp) so most of the optional arguments are just settings passed over to the actual image processing task.

| Input  | Description | Required | Default |
| :--- | :--- | :---: | :--- |
| **[`source`](#source)** | Source images folder | ✓ | `'images'` |
| **[`output`](#output)** | Thumbnails output folder | ✓ | `'thumbnails'` |
| **[`sizes`](#sizes)** | Thumbnail sizes | ✓ | `480` |
| **[`subfolder`](#subfolder)** | Thumbnails subfolder pattern | 𐄂 | `'%D'` |
| **[`filename`](#filename)** | Thumbnail filename pattern | 𐄂 | `'%F'` |
| **[`extensions`](#extensions)** | Image extensions filter | 𐄂 | `'jpg, jpeg, png, webp, gif, tiff'` |
| **[`fit`](#fit)** | How the images should be resized to dimension | 𐄂 | `'cover'` |
| **[`position`](#position)** | Position, gravity or strategy for cover or contain | 𐄂 | `'centre'` |
| **[`enlarge`](#enlarge)** | Enlarge smaller images to thumbnail dimensions | 𐄂 | `true` |
| **[`overwrite`](#overwrite)** | Overwrite existing images | 𐄂 | `false` |

#### `source`
Input images directory path (string) relative to the repository base. **Required** both as an argument and as an existing directory path in repository. Action throws error if the argument path is not an existing repository folder. Default is `'images'`.

#### `output`
Output thumbnails directory path (string) relative to the repository base. It is  **required** but the directory will be (recursively) created if not present. The argument will be output as a path string from the action to be used in further workflow jobs or steps. Default is `'thumbnails'`.

#### `sizes`
Output thumbnail dimensions (number, string or comma-delimited string of numbers or strings). Any number of sizes separated with a comma can be supplied but at least one is **required**. If the size is a number only it will be treated as width, prefix it with an `x` to process it as height dimension. To set both output width and height dimensions, set width and height with the `x` separator eg. `1920x1080`. Default is `480`.

#### `subfolder`
Subfolder (string) pattern for each width. Use `false` to output directly to the [`output`](#output) folder but not that any existing or generated files will not be overwritten by default. Pattern strings `%D`, `%W` and `%H` can be used to be replaced by the generated image dimension values where `%W` is image width in pixels, `%H` is image height in pixels and `%D` is width or height if width is not set.
>**Note**: Even when using `subfolder: false` source images can not and will never be overwritten. The action uses sharp's [toFile](https://sharp.pixelplumbing.com/api-output#tofile) output option which means the source and destination file can not match. If that is a requirement image processing task can be [modified or replaced completely](#image-processing-task-modifications) to eg. use sharp streams or imagemagick or review some of the [alternatives](#alternatives).

#### `filename`
Thumbnail output filename (string) pattern. In addition to the above [`subfolder`](#subfolder) patterns `%D`, `%W` and `%H`, additional replace patterns are available: `%F`, `%N` and `%E` where `%F` is input filename, which is same as `%N%E` - `%N` is input base filename and `%E` is the input file's extension. Default is `%F`.

#### `extensions`
Input files images extensions filter (string or comma-delimited string of strings). [Sharp](https://sharp.pixelplumbing.com) can process JPEG, PNG, WebP, GIF, SVG and TIFF image files so possible values are `'jpg'` or `'jpeg'`, `'png'`, `'webp'`, `'gif'`, `'tiff'`, `'svg'` or any combination of them as a comma-delimited string. Default is 'jpg, jpeg, png, webp, gif, tiff' as vector image thumbnails are probably not needed.

#### `fit`
[Sharp input](https://sharp.pixelplumbing.com/api-resize) parameter (string) for how the image should be resized to fit both provided thumbnail dimensions. Possible values:
  - **`'cover'`** (default): Preserving aspect ratio, ensure the image covers both provided dimensions by cropping/clipping to fit.
  - **`'contain'`**: Preserving aspect ratio, contain within both provided dimensions using "letter-boxing" where necessary.
  - **`'fill'`**: Ignore the aspect ratio of the input and stretch to both provided dimensions.
  - **`'inside'`**: Preserving aspect ratio, resize the image to be as large as possible while ensuring its dimensions are less than or equal to both those specified.
  - **`'outside'`**: Preserving aspect ratio, resize the image to be as small as possible while ensuring its dimensions are greater than or equal to both those specified.
>**Note**: Both width and height action sizes options have to be set for this argument to apply.

#### `position`
[Sharp input](https://sharp.pixelplumbing.com/api-resize) parameter (string) for position, gravity or strategy when using a [`fit`](#fit) of `cover` or `contain`. Options are: `top`, `right top`, `right`, `right bottom`, `bottom`, `left bottom`, `left`, `left top`, `north`, `northeast`, `east`, `southeast`, `south`, `southwest`, `west`, `northwest`, `center`, `centre` (default), `entropy` ([`fit`](#fit): `'cover'` only) and `attention` ([`fit`](#fit): `'cover'` only)

#### `enlarge`
A (string) parameter wether to enlarge generated thumbnails if the source image width or height are less than the specified dimensions. Possible values: `'true'` (default) or `'false'`.

#### `overwrite`
A (string) parameter wether to overwrite any existing files in the [`output` folder](#output). Possible values: `'true'` or `'false'` (default).

### Outputs

If there are no breaking errors, the action only sets a workflow environment variable: `thumbnails` which is the repository relative path string for the container [`output` images folder](#output). It can be used in any further image actions or passed to a commit repository action.

### Example usage

#### Example `workflow.yml`

Example commented workflow file with all optional arguments and example commit step using the output environment variable. It will trigger on any new or modified files added to the `/images` repository folder (set under `paths:`) and

```yaml
name: Generate thumbnails
on:
  push:
    branches:
      - master
    paths:
      - 'images/*' # Only run on this path changes
jobs:
  generate_thumbnails:
    name: Generate thumbnails
    runs-on: ubuntu-latest
    timeout-minutes: 10 # Should be enough for all runs, GH default is 360 which is unreasonable...
    steps:
      - name: Checkout repository # Check out the repo to access the input image folder.
        uses: actions/checkout@master
      - name: Process Images
        uses: subic/ghaction-thumbnails@v1 # Tag number optional, breaking changes not expected.
        with: # Arguments:
          source: 'images' # REQUIRED
          output: 'thumbnails' # REQUIRED
          sizes: 480 # REQUIRED
          extensions: 'jpg, jpeg, png, webp, gif, tiff'
          subfolder: '%D'
          filename: '%F'
          fit: 'cover'
          position: 'centre'
          enlarge: 'true'
          overwrite: 'false'
      - name: Commit thumbnail folder # This step will commit generated files, remove if not used as a single purpose workflow. Will exit gracefully if no changes are found.
        run: |
          echo "Committing folder ${{env.thumbnails}}"
          git config --local user.name "${{github.actor}}"
          git config --local user.email "${{github.actor}}@users.noreply.github.com"
          git add ./${{env.thumbnails}} || exit 0
          git commit -m "[skip ci] Auto-generated missing thumbnails" -a || exit 0
          git push -f -q https://${{secrets.GITHUB_TOKEN}}@github.com/${{github.repository}}
```

#### Example repository

An example repository with the workflow file usage example is [available here](https://github.com/subic/ghaction-thumbnails-example). You can fork it and after pushing an image to the `images` folder on GitHub, example thumbnails will be generated in the `output` folder. A comparison `test` folder is also available which will run the action and its[alternatives](#alternatives) for comparison.

### Notes

The action was developed as a way to prevent excess thumbnail generation when using a build tool for a static website. When using "git as a cms" with tools such as [netlifycms](https://www.netlifycms.org/) or GitHub pages, any files generated as part of the build process are not committed to the source repository and therefore needlessly regenerated on each full build.

## Development

The code is (somewhat) commented and build as to allow easy automatization for any thumbnail generation need. The actual image processing task is hot-pluggable to allow replacement of sharp output or even sharp itself.

### Repo structure

    .
    ├── dist                    # Compiled main script code with modules (for GH linux)
    ├── helpers                 # Helper functions folder
    │   ├── folders.js          # Node files system helper scripts
    │   ├── images.js           # Image processing script
    │   └── inputs.js           # Input arguments validation helper scripts
    ├── .gitignore
    ├── action.yml              # Main action file
    ├── index.js                # Main script file
    ├── LICENSE.md
    ├── package-lock.json
    └── package.json

### Image processing task modifications

**TODO**

### Build and compile

**TODO**

### Dependencies

- [GitHub Actions Toolkit](https://github.com/actions/toolkit) -  The GitHub ToolKit for developing GitHub Actions.
- [sharp](https://github.com/lovell/sharp) - High performance Node.js image processing.

In addition, the following `devDependencies` are used for linting only: `eslint`, `eslint-config-airbnb-base` and `eslint-plugin-import`.

### Alternatives

- [node-thumbnail](https://www.npmjs.com/package/node-thumbnail)
- [Image Resizer Action](https://github.com/marketplace/actions/image-resizer-action)

Or keep your life simple and avoid the whole use-case with [Netlify Large Media](https://docs.netlify.com/large-media/transform-images/) or [Cloudinary](https://cloudinary.com).

### Contributions
Any contributions welcome! [Open a new issue](https://github.com/subic/ghaction-thumbnails/issues/new) or submit a pull request.

### License
The code in this project is released under the [MIT License](LICENSE).

const path = require('path');
const BASE_PATH = __dirname;
const staticBase = path.resolve(BASE_PATH, '../../static');
const outputBase = path.resolve(BASE_PATH, '../../dist');
const customBase = path.resolve(BASE_PATH, '../../src');
const configPath = {
    entryPath: path.resolve(customBase, 'app.js'),
    outputPath: outputBase,
    srcRootPath: customBase,
    componentsRootPath: path.resolve(customBase, 'components'),
    staticRootPath: staticBase,
    templatePath: path.resolve(BASE_PATH, '../../template/index.tmp.html'),
    outputTemplatePath: path.resolve(outputBase, 'index.html'),
    cssRootPath: path.resolve(BASE_PATH, '../../css')
}
module.exports = configPath;

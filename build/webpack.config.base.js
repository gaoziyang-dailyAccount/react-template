const configPath = require('./loader/configPath');
const fileLoader = require('./loader/fileLoader');
const babelLoader = require('./loader/babelLoader');
module.exports = {
    entry: {
        app: configPath.entryPath
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css'], //这个css最好不配置,
        alias: {
            'src': configPath.srcRootPath,
            'components': configPath.componentsRootPath,
            'static': configPath.staticRootPath,
            'css': configPath.cssRootPath
        }
    },
    module: {
        rules: [
            babelLoader,
            fileLoader.file,
            fileLoader.media,
            fileLoader.fonts
        ]
    }
}
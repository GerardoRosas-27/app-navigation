// Learn more https://docs.expo.io/guides/customizing-metro


const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
    ...defaultConfig,
    resolver: { //import files dynamically from assets
        ...defaultConfig.resolver,
        extraNodeModules: new Proxy(
            {},
            {
                get: (target, name) => {
                    return path.join(__dirname, `node_modules/${name}`);
                },
            }
        ),
    },
    watchFolders: [...defaultConfig.watchFolders, path.resolve(__dirname, '../')],
};

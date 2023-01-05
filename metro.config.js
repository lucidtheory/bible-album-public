const blacklist = require('metro-config/src/defaults/exclusionList');
const { getDefaultConfig } = require('expo/metro-config');

const { resolver, transformer } = getDefaultConfig(__dirname);

module.exports = {
  transformer: {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
    blacklistRE: blacklist([/#current-cloud-backend\/.*/, /^amplify\/.*/]),
    sourceExts: [...resolver.sourceExts, 'svg'],
  },
};

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@theme': './src/theme',
            '@utils': './src/utils',
            '@services': './src/services',
            '@components': './src/components',
            '@features': './src/features',
            '@state': './src/state',
            '@hooks': './src/hooks',
            '@mocks': './src/mocks',
            '@app': './src/app',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};

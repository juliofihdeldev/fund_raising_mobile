module.exports = {
  // presets: ['module:metro-react-native-babel-preset'],
  plugins: [],
  presets: [
    ['module:metro-react-native-babel-preset'],
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};

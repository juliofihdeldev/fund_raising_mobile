module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['js', 'jsx', 'tsx', 'json', 'ts', 'node'],
  setupFilesAfterEnv: ['./jest-setup.js'],
  // setupFiles: ['./jest-setup.js'],
  transformIgnorePatterns: [
    // 'node_modules/(?!(jest-)?react-native|@react-native-community|@react-navigation|react-native-vector-icons)',
    'node_modules/(?!(@react-native|react-native|react-native-vector-icons)/)',
  ],
  testPathIgnorePatterns: ['/__mocks__', '/node_modules/', '/coverage/'],
};

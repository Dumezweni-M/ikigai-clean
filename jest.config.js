module.exports = {
  preset: '@react-native/jest-preset',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@apollo|@testing-library|lucide-react-native)/)',
  ],
  moduleNameMapper: {
    'lucide-react-native/dist/esm/icons/(.*)': 'lucide-react-native',
    'react-native-chart-kit': '<rootDir>/__mocks__/react-native-chart-kit.js',
  },
};
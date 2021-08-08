module.exports = {
  transformIgnorePatterns: ['/node_modules/(?!(pupa|escape-goat)).+\\.js$'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}',
    '!**/node_modules/**',
    '!dist/**',
    '!coverage/**',
  ],
};

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    "jest/globals": true
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
  },
  "plugins": ["jest"]
};

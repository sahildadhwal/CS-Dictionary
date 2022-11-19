module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'jest/globals': true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    "no-use-before-define": "off",
    "no-continue": "off",
    "no-trailing-spaces": "off"
  },
  plugins: ['jest'],
};

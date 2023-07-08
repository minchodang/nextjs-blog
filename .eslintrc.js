'use strict';

var fs = require('fs');

var path = require('path');

var parserOptions = {
  project: './tsconfig.json',
};

if (!fs.existsSync(path.join(process.env.PWD || '.', './tsconfig.json'))) {
  parserOptions = {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  };
}

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['react-hooks'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
  parserOptions: parserOptions,
  extends: ['plugin:storybook/recommended'],
};

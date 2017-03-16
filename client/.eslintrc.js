/**
 * Module dependencies.
 */

const path = require('path');

/**
 * ESLint configuration.
 */

module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: path.resolve(__dirname, './app.webpack.config.js'),
      },
    },
    'import/core-modules': [
      'react', 'react-dom', 'classnames',
    ],
  },
  rules: {
    'import/no-extraneous-dependencies': 0,
    'no-underscore-dangle': [2, {
      allow: ['_id']
    }]
  },
};

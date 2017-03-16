module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './client/app.webpack.config.js'
      },
    },
    'import/core-modules': [
      'react', 'react-dom', 'classnames',
    ],
  },
};

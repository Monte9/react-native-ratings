const path = require('path');
const package = require('../package.json');

module.exports = function(api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            // For development, we want to alias the library to the source
            [package.name]: path.join(__dirname, '..', package.main),
          },
        },
      ],
    ],
  };
};
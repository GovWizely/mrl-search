var gulp = require('gulp'),
    path = require('path'),
    assign = require('object-assign'),
    ghPages = require('gulp-gh-pages');

var defaultConfig = require('./config.default');

var dist = path.resolve(__dirname, '../dist');

module.exports = function() {
  var config = assign({}, defaultConfig, {
    default: false, // cmd is `gulp build:{env}` when default is false
    env: 'production',
    dist: {
      root: dist,
      font: path.resolve(dist, 'fonts'),
      image: path.resolve(dist, 'images'),
      style: path.resolve(dist, 'css'),
      bundle: 'js/bundle.js'
    },
    envify: {
      NODE_ENV: 'production',
      WEBSERVICES_URL: 'https://api.govwizely.com/market_research_library/search?',
      WEBSERVICES_API_KEY: '9Fbtlor84df8F3UqaUfbImlz'
    }
  });

  var build = require('./tasks/build')(gulp, config);

  gulp.task('deploy', ['build:production'], function() {
    return gulp.src(config.dist.root + '/**/*')
      .pipe(ghPages());
  });
};

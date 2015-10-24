var _           = require('lodash'),
    del         = require('del'),
    gulp        = require('gulp'),
    gulpUtil    = require('gulp-util'),
    browserify  = require('browserify'),
    source      = require('vinyl-source-stream'),
    buffer      = require('vinyl-buffer'),
    sourcemaps  = require('gulp-sourcemaps'),
    sass        = require('gulp-sass'),
    notify      = require('gulp-notify'),
    bower       = require('gulp-bower'),
    watchify    = require('watchify'),
    uglify      = require('gulp-uglify'),
    babelify    = require('babelify'),
    wiredep     = require('wiredep').stream,
    browserSync = require('browser-sync');

var config = {
  sourcePath: './src',
  distPath: './dist',
  bowerDir: './bower_components'
};

var log = {
  init: function(message) {
    gulpUtil.colors.yellow('[❗] ' + message);
  },
  error: function(message) {
    gulpUtil.colors.red('[✖] ' + message);
  },
  success: function(message) {
    gulpUtil.colors.green('[✔] ' + message);
  }
};

gulp.task('browser-sync', ['build'], function() {
  browserSync({
    baseDir: config.distPath,
    server: {
      baseDir: config.distPath
    }
  });
});

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest(config.bowerDir));
});

gulp.task('icon-build', function() {
  return gulp.src(config.bowerDir + '/components-font-awesome/fonts/**.*')
    .pipe(gulp.dest(config.distPath + '/fonts'));
});

var scss = {
  path: config.sourcePath + '/scss',
  build: function() {
    log.init("Building scss");
    return gulp.src(config.sourcePath + '/scss/*.scss')
      .pipe(
        sass({
          style: 'compressed',
          loadPath: [
            config.bowerDir + '/bootstrap-sass/assets',
            config.bowerDir + '/components-font-awesome/scss',
          ]
        }).on("error", function(error) { log.error(error); })
      )
      .pipe(gulp.dest(config.distPath + '/css'))
      .on('end', function() { log.success('Completed scss build.'); });
  },
  reload: function() {
    return scss
      .build()
      .pipe(browserSync.stream());
  },
  watch: function() {
    return gulp.watch(config.sourcePath + '/scss')
      .on('change', function(e) {
        scss.reload();
      });
  }
};

gulp.task('scss-build', scss.build);
gulp.task('scss-reload', scss.reload);
gulp.task('scss-watch', ['browser-sync'], scss.watch);

var html = {
  build: function () {
    log.init("Building html");
    return gulp.src(config.sourcePath + '/index.html')
      .pipe(wiredep({ ignorePath: config.distPath }))
      .pipe(gulp.dest(config.distPath))
      .on('end', function() { log.success('Completed html build.'); });
  },
  reload: function () {
    return html.build()
      .pipe(browserSync.stream());
  },
  watch: function () {
    return gulp.watch('src/index.html', html.reload);
  }
};

gulp.task('html-build', html.build);
gulp.task('html-reload', html.reload);
gulp.task('html-watch', ['browser-sync'], html.watch);

var js = {
  b: browserify({
      entries: [config.sourcePath + '/index.js'],
      cache: {},
      packageCache: {}
  }).transform(babelify, { blacklist: 'regenerator' }),
  build: function() {
    log.init('Building js');
    return js.b.bundle()
      .on('error', function(error) {
        log.error(error);
      })
      .pipe(source('js/bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(config.distPath));
  },
  reload: function() {
    return js
      .build()
      .pipe(browserSync.stream());
  },
  watch: function() {
    watchify(js.b)
      .on('update', js.reload)
      .on('time', function(time) {
        log.success("Finished JS build in: ", gulpUtil.colors.cyan(time + 'ms'));
      });
    return js.reload();
  }
};

gulp.task('js-build', js.build);
gulp.task('js-reload', js.reload);
gulp.task('js-watch', ['browser-sync'], js.watch);

gulp.task('setup', [
  'bower',
  'build'
]);

gulp.task('build', [
  'icon-build',
  'scss-build',
  'html-build',
  'js-build'
]);

gulp.task('watch', [
  'scss-watch',
  'html-watch',
  'js-watch'
]);

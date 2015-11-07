'use strict';

var _ = require('lodash'),
    defaultClientAssets = require('./client/config/assets/default'),
    clientTestAssets = require('./client/config/assets/test'),
    defaultApiAssets = require('./api/config/assets/default'),
    apiTestAssets = require('./api/config/assets/test'),
    gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    runSequence = require('run-sequence'),
    plugins = gulpLoadPlugins({
      rename: {
        'gulp-angular-templatecache': 'templateCache'
      }
    }),
    path = require('path'),
    endOfLine = require('os').EOL,
    protractor = require('gulp-protractor').protractor,
    webdriver_update = require('gulp-protractor').webdriver_update,
    webdriver_standalone = require('gulp-protractor').webdriver_standalone;


// Tasks for changing the environment (NODE_ENV)
gulp.task('env:test', function() {
  process.env.NODE_ENV = 'test';
});

gulp.task('env:dev', function() {
  process.env.NODE_ENV = 'development';
});

gulp.task('env:prod', function() {
  process.env.NODE_ENV = 'production';
});

// Nodemon task
// note(seb): for the watch, we're combining the resources from both the api and the client
gulp.task('nodemon', function() {
  return plugins.nodemon({
      script: 'server.js',
      nodeArgs: ['--debug'],
      ext: 'js,html',
      watch: _.union(defaultClientAssets.server.views, defaultClientAssets,server.allJS, defaultClientAssets.server.config, 
                     defaultApiAssets.server.allJS, defaultApiAssets.server.config)
    });
})

// Watch the following files for changes
gulp.task('watch', function() {
  
  // Start livereload
  plugins.livereload.listen();  

  // Add watch rules (both api and client)
  gulp.watch(defaultClientAssets.server.views).on('change', plugin.livereload.changed);
  gulp.watch(defaultClientAssets.server.allJS, ['jshint']).on('change', plugin.livereload.changed);
  gulp.watch(defaultClientAssets.client.js, ['jshint']).on('change', plugin.livereload.changed);
  gulp.watch(defaultClientAssets.client.css, ['csslint']).on('change', plugin.livereload.changed);
  gulp.watch(defaultClientAssets.client.sass, ['sass', 'csslint']).on('change', plugin.livereload.changed);

  gulp.watch(defaultApiAssets.server.allJS, ['jshint']).on('change', plugin.livereload.changed);

  // note(seb): we're restarting on changes to the gulp file because that usually means a new version has been made available
  // note(seb): and yes, it's the same file twice, but just to illustrate the concept that this should be loaded twice (once on the client and once on the api)
  if(process.env.NODE_ENV === 'production') {
    gulp.watch(defaultClientAssets.server.gulpConfig, ['templateCache', 'jshint']);
    gulp.watch(defaultClientAssets.client.views, ['templateCache', 'jshint']).on('change', plugins.livereload.changed);

    // note(seb): commented out the second load of the gulp config file, decomment when separated from the UI
    // gulp.watch(defaultApiAssets.server.gulpConfig, ['templateCache', 'jshint']);
  }
  else {
    gulp.watch(defaultClientAssets.server.gulpConfig, ['jshint']);
    gulp.watch(defaultClientAssets.client.views).on('change', plugins.livereload.changed);

    // note(seb): commented out the second load of the gulp config file, decomment when separated from the UI
    // gulp.watch(defaultApiAssets.server.gulpConfig, ['jshint']);
  }

});

// CSS Linting
// note(seb): for this, we're assuming that there are no CSS files on the API side
//            but if that's not the case, add the proper config props and paths for this task
gulp.task('csslint', function(done) {
  return gulp.src(defaultClientAssets.client.css)
    .pipe(plugins.csslint('.csslintrc'))
    .pipe(plugins.csslint.reporter())
    .pipe(plugins.csslint.reporter(function(file) {
      if(!file.csslint.errorCount) {
        done();
      } 
    }));
});

// JS linting using jshint
gulp.task('jshint', function() {
  var assets = _.union(
    defaultClientAssets.server.gulpConfig,
    defaultClientAssets.server.allJS,
    defaultClientAssets.client.js,
    clientTestAssets.tests.server,
    clientTestAssets.tests.client,
    clientTestAssets.tests.e2e,
    // defaultApiAssets.server.gulpConfig,
    defaultApiAssets.server.allJS,
    apiTestAssets.tests.server,
    apiTestAssets.tests.client,
    apiTestAssets.tests.e2e
  );

  return gulp.src(assets)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'))
    .pipe(plugins.jshint.reporter('fail'));
});


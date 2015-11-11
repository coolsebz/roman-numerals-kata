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
      watch: _.union(defaultClientAssets.server.views, defaultClientAssets.server.allJS, defaultClientAssets.server.config, 
                     defaultApiAssets.server.allJS, defaultApiAssets.server.config)
    });
})

// Watch the following files for changes
gulp.task('watch', function() {
  
  // Start livereload
  plugins.livereload.listen();  

  // Add watch rules (both api and client)
  gulp.watch(defaultClientAssets.server.views).on('change', plugins.livereload.changed);
  gulp.watch(defaultClientAssets.server.allJS, ['jshint']).on('change', plugins.livereload.changed);
  gulp.watch(defaultClientAssets.client.js, ['jshint']).on('change', plugins.livereload.changed);
  gulp.watch(defaultClientAssets.client.css, ['csslint']).on('change', plugins.livereload.changed);
  gulp.watch(defaultClientAssets.client.sass, ['sass', 'csslint']).on('change', plugins.livereload.changed);

  gulp.watch(defaultApiAssets.server.allJS, ['jshint']).on('change', plugins.livereload.changed);

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

// ESLint task
gulp.task('eslint', function() {
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
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format());
});

// JS minifying
gulp.task('uglify', function() {
  var assets = _.union(
    defaultClientAssets.client.js,
    defaultClientAssets.client.templates
  );

});

// CSS minifying
gulp.task('cssmin', function() {
  return gulp.src(defaultClientAssets.client.css)
    .pipe(plugins.cssmin())
    .pipe(plugins.concat('application.min.css'))
    .pipe(gulp.dest('client/public/dist'));
});

// Sass task
gulp.task('sass', function() {
  return gulp.src(defaultClientAssets.client.sass)
    .pipe(plugins.sass())
    .pipe(plugins.autoprefixer())
    .pipe(plugins.rename(function(file) {
      file.dirname = file.dirname.replace(path.sep + 'scss', path.sep + 'css');
    }))
    .pipe(gulp.dest('./client/modules/'));
})

// Angular template cache task
gulp.task('templatecache', function() {
  var re = RegExp('\\' + path.sep + 'client\\' + path.sep, 'g');

  return gulp.src(defaultClientAssets.client.views)
    .pipe(plugins.templatecache('template.js', {
      root: 'client/modules/',
      module: 'core',
      templateHeader: '(function () {' + endOfLine + '  \'use strict\';' + endOfLine + '  angular.module(\'<%= module %>\'<%= standalone %>)' + endOfLine + '    .run(templates);' + endOfLine + ' templates.$inject = [\'$templateCache\'];' + endOfLine + '  function templates($templateCache) {' + endOfLine,
      templateBody: '$templateCache.put(\'<%= url %>\', \'<%= contents =>\' );',
      templateFooter: '}' + endOfLine + '})();',
      transformUrl: function(url) {
        return url.replace(re, path.sep);
      }
    }))
    .pipe(gulp.dest('build'));
});

// Mocha tests
gulp.task('mocha', function(done) {
  // we need mongoose for this
  var mongoose = require('./api/config/lib/mongoose'),
      error;

  mongoose.connect(function() {
    mongoose.loadModels();

    // starting the tests
    gulp.src(apiTestAssets.tests.server)
      .pipe(plugins.mocha({
        reporter: 'spec',
        timeout: 10000
      }))
      .on('error', function(err) {
        // If we find an error we save it
        error = err; 
      })
      .on('end', function() {
       mongoose.disconnect(function() {
        // note(seb): this passes the errors back to gulp
        done(error);
       }); 
      });
  });
});

// Karma test runner
gulp.task('karma', function(done) {
  return gulp.src([])
    .pipe(plugins.karma({
      configFile: 'karma.conf.js',
      action: 'run',
      singleRun: true
    }));
});

// Task for dropping the DB, used in E2E tests
gulp.task('dropdb', function(done) {
  var mongoose = require('./api/config/lib/mongoose.js');

  mongoose.connect(function(db) {
    db.connection.db.dropDatabase(function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log('Successfully dropped db: ', db.connection.db.databaseName);
      }
      db.connection.db.close(done);
    });
  });
});

// Selenium webdriver
gulp.task('webdriver_update', webdriver_update);

// Starts the selenium server
// note(seb): not needed if you reference seleniumServerJar in your protactor.conf.js
gulp.task('webdriver_standalone', webdriver_standalone);

// Protractor test runner
gulp.task('protractor', ['webdriver_update'], function() {
  gulp.src([])
    .pipe(protractor({
      configFIle: 'protractor.conf.js' 
    }))
    .on('end', function() {
      console.log('E2E tests completed');
      process.exit(0); // success  
    })
    .on('error', function(err) {
      console.log('E2E Tests failed');
      process.exit(1);
    });
});

// Lint CSS and JS files
gulp.task('lint', function(done) {
  runSequence('sass', ['csslint', 'eslint', 'jshint'], done);
});

// Lint project files and minify them down to 2 files
gulp.task('build', function(done) {
  runSequence('env:dev', 'lint', ['uglify', 'cssmin'], done);
});

// Run the project tests
gulp.task('test', function(done) {
  runSequence('env:test', 'lint', 'mocha', 'karma', 'nodemon', 'protractor', done);
});

gulp.task('test:server', function(done) {
  runSequence('env:test', 'lint', 'mocha', done);
});

gulp.task('test:client', function(done) {
  runSequence('env:test', 'lint', 'karma', done);
});

gulp.task('test:e2e', function(done) {
  runSequence('env:test', 'lint', 'dropdb', 'nodemon', 'protractor', done);
});

// Run the project in dev mode
gulp.task('default', function(done) {
  runSequence('env:dev', 'lint', ['nodemon', 'watch'], done);
});

gulp.task('debug', function(done) {
  runSequence('env:dev', 'lint', ['nodemon', 'watch'], done); 
});

// Run the project in production mode
gulp.task('prod', function(done) {
  runSequence('templatecache', 'build', 'env:prod', 'lint', ['nodemon', 'watch'], done);
});
var gulp = require('gulp');
var markdown = require('gulp-markdown');
var concat = require('gulp-concat');
var toc = require('gulp-doctoc');
var zip = require('gulp-zip');
var clean = require('gulp-clean');
var pkg = require('./package.json');
var uglify = require('gulp-uglify');
var pump = require('pump');
var rename = require("gulp-rename");

var config = {
  jsToMinify : ['server/js/add-floating-scrollbar.js', 'server/js/jquery.ba-floatingscrollbar.js'],
  distDir : './dist'
};

gulp.task('copy-files', ['clean'], function() {
  return gulp.src(['dynamic_action_plugin_pl_sebastiancichosz_floating-scrollbar.sql', 'preview.gif'])
    .pipe(gulp.dest(config.distDir));
});

gulp.task('readme-to-html', ['clean'], function() {
  return gulp.src(['README.md', 'CHANGELOG.md', 'LICENSE.md'])
    .pipe(concat('README.md'))
    .pipe(toc({
      title: "Contents",
      depth: 1
    }))
    .pipe(markdown())
    .pipe(gulp.dest(config.distDir));
});

gulp.task('zip', ['copy-files', 'readme-to-html'], function() {
  return gulp.src(config.distDir + '/*')
    .pipe(zip(pkg.name + '-' + pkg.version + '.zip'))
    .pipe(gulp.dest(config.distDir));
});

gulp.task('clean-zipped', ['zip'], function() {
  return gulp.src(config.distDir + '/!(*.zip)', {
      read: false
    })
    .pipe(clean());
});

gulp.task('clean', function() {
  return gulp.src(config.distDir + '/*', {
      read: false
    })
    .pipe(clean());
});

gulp.task('minify', function(cb) {
    gulp.src(config.jsToMinify)
      .pipe(uglify())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('server/js'));
/*
  pump([gulp.src('server/js/add-floating-scrollbar.js'),
    uglify(), gulp.dest('server/js/add-floating-scrollbar.min.js')
  ], cb);
*/
});

gulp.task('watch', function() {
  gulp.watch(config.jsToMinify, ['minify']);
});

gulp.task('build', ['clean', 'minify', 'copy-files', 'readme-to-html', 'zip', 'clean-zipped']);
gulp.task('default', ['watch']);

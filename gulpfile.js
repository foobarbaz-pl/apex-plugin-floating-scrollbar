var gulp = require('gulp');
var markdown = require('gulp-markdown');
var concat = require('gulp-concat');
var toc = require('gulp-doctoc');
var zip = require('gulp-zip');
var clean = require('gulp-clean');
var distDir = './dist';
var pkg = require('./package.json');

gulp.task('copy-files', ['clean'], function() {
  return gulp.src(['dynamic_action_plugin_pl_sebastiancichosz_floating-scrollbar.sql', 'preview.gif'])
  .pipe(gulp.dest(distDir));
});

gulp.task('readme-to-html', ['clean'], function() {
  return gulp.src(['README.md', 'CHANGELOG.md', 'LICENSE.md'])
  .pipe(concat('README.md'))
  .pipe(toc({
    title: "Contents",
    depth: 1
  }))
  .pipe(markdown())
  .pipe(gulp.dest(distDir));
});

gulp.task('zip', ['copy-files', 'readme-to-html'], function() {
  return gulp.src(distDir + '/*')
  .pipe(zip(pkg.name + '-' + pkg.version + '.zip'))
  .pipe(gulp.dest(distDir));
});

gulp.task('clean-zipped', ['zip'], function(){
  return gulp.src(distDir + '/!(*.zip)', {read: false})
  .pipe(clean());
});

gulp.task('clean', function(){
  return gulp.src(distDir + '/*', {read: false})
  .pipe(clean());
});

gulp.task('default', ['clean', 'copy-files', 'readme-to-html', 'zip', 'clean-zipped']);

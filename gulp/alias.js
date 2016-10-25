const gulp = require('gulp');

gulp.task('default', [
  'watch',
  'dev'
]);

gulp.task('lint', [
  'eslint',
  'htmlhint',
]);

gulp.task('doc', [
  'jsdoc'
]);

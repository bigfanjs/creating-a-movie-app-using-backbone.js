import gulp from 'gulp';
import runSequence from 'run-sequence';

import bundle from './tasks/bundle';
import nodeBabel from './tasks/node-babel';
import browserSync from './tasks/browser-sync';
import nodemon from './tasks/nodemon';
import testBrowser from './tasks/test-browser';
import clean from './tasks/clean';
import htmlMin from './tasks/html-min';
import imageMin from './tasks/image-min';
import cssMin from './tasks/css-min';
import fontsCopy from './tasks/fonts-copy';

gulp.task('bundle', bundle());
gulp.task('node-babel', nodeBabel());
gulp.task('nodemon', ['node-babel'], nodemon());
gulp.task('browser-sync', ['nodemon'], browserSync());
gulp.task('test-browser', testBrowser());
gulp.task('clean', clean());
gulp.task('html-min', htmlMin());
gulp.task('image-min', imageMin());
gulp.task('css-min', cssMin());
gulp.task('fonts-copy', fontsCopy());

gulp.task('watch', ['html-min', 'css-min', 'image-min', 'fonts-copy'], function () {
  gulp.watch('public/*.html', ['html-min']);
  gulp.watch('public/images/**/*.{jpg,png,gif,svg}', ['image-min']);
  gulp.watch('public/stylesheets/**/*.css', ['css-min']);
  gulp.watch('public/fonts/*', ['fonts-copy']);
});

gulp.task('default', cb => {
  runSequence('clean', ['watch', 'browser-sync', 'bundle'], cb);
});
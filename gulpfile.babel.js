import gulp from 'gulp';
import runSequence from 'run-sequence';

import bundle from './tasks/bundle';
import nodeBabel from './tasks/node-babel';
import browserSync from './tasks/browser-sync';
import nodemon from './tasks/nodemon';
import testBrowser from './tasks/test-browser';
import clean from './tasks/clean';
import htmlMin from './tasks/html-min';

gulp.task('bundle', bundle());
gulp.task('node-babel', nodeBabel());
gulp.task('nodemon', ['node-babel'], nodemon());
gulp.task('browser-sync', ['nodemon'], browserSync());
gulp.task('test-browser', testBrowser());
gulp.task('clean', clean());
gulp.task('html-min', htmlMin());

gulp.task('default', cb => {
  runSequence('clean', ['browser-sync', 'bundle', 'html-min'], cb);
});
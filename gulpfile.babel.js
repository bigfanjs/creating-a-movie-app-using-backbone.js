import gulp from 'gulp';

import bundle from './tasks/bundle';
import browserSync from './tasks/browser-sync';
import nodemon from './tasks/nodemon';
import test_browser from './tasks/test-browser';

gulp.task('bundle', bundle());
gulp.task('nodemon', nodemon());
gulp.task('browserSync', ['nodemon'], browserSync());
gulp.task('test-browser', test_browser());

gulp.task('default', ['browserSync', 'bundle']);
import gulp from 'gulp';
import browserify from 'browserify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import gutil from 'gulp-util';

import { bs } from './browser-sync';

const
  reload = bs.reload,
  bundle_js = function ( bundler ) {
    bundler.bundle()
      .on('error', gutil.log)
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('../build/public/javascripts/'))
      .pipe(reload({ stream: true }));
  };

export default function () {
  return () => {
    const
      main = 'public/javascripts/main.js',
      bundler = watchify(
        browserify(main, { debug: true })
          .transform('babelify', { presets: ['es2015'] })
          .transform('pugify')
      );

    bundle_js( bundler );

    bundler.on('update', () => { bundle_js( bundler ); });
  };
}
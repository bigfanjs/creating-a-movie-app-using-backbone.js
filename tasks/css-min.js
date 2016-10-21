import gulp from 'gulp';
import minify from 'gulp-cssnano';
import filter from 'gulp-filter';
import concat from 'gulp-concat';

export default function () {
  return () => {

    const f = filter([
      'bootstrap.min.js',
      'bootstrap-theme.min.js'        
    ], { restore: true });

    gulp.src('public/stylesheets/**/*.css')
      .pipe(f)
      .pipe(minify())
      .pipe(f.restore)
      .pipe(concat('styles.css'))
      .pipe(gulp.dest('../build/public/stylesheets'));
  };
}
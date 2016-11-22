import gulp from 'gulp';
import minify from 'gulp-cssnano';
import filter from 'gulp-filter';
import concat from 'gulp-concat';

export default function () {
  return () => {
    const f = filter([
      'public/stylesheets/styles.css'
    ], { restore: true });

    gulp.src('public/stylesheets/**/*.css')
      .pipe(f)
      .pipe(minify())
      .pipe(f.restore)
      .pipe(gulp.dest('../build/public/stylesheets'));
  };
}
import gulp from 'gulp';
import minify from 'gulp-cssnano';
import filter from 'gulp-filter';
import rename from 'gulp-rename';

export default function () {
  return () => {
    const f = filter([
      'public/stylesheets/styles.css',
      'public/stylesheets/mocha.css'
    ], { restore: true });

    gulp.src('public/stylesheets/**/*.css')
      .pipe(f)
      .pipe(minify())
      .pipe(f.restore)
      .pipe(rename(path => {
        path.dirname = './';
      }))
      .pipe(gulp.dest('../build/public/stylesheets'));
  };
}
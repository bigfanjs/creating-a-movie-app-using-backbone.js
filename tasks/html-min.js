import gulp from 'gulp';
import htmlMin from 'gulp-htmlmin';

export default function () {
  return () => {
    gulp.src('./public/app.html')
      .pipe(htmlMin({ collapseWhitespace: true }))
      .pipe(gulp.dest('../build/public'));
  };
}
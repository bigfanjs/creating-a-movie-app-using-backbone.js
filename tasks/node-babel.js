import gulp from 'gulp';

export default function () {
  return () => {
    return gulp.src('server.js')
      .pipe(gulp.dest('../build/'));
  };
}
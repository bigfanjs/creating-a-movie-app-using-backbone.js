import gulp from 'gulp';

export default function () {
  return () => {
    gulp.src('./public/fonts/*')
      .pipe(gulp.dest('../build/public/fonts/'));
  };
}
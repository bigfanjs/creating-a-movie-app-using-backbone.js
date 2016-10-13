import browserSync from 'browser-sync';

export const bs = browserSync.create();
export default function () {
  return () => {
    bs.init({
      baseDir: './public/javascripts/',
      files: [
        './apps/**/*.js',
        './lib/**/*.js',
        './*.js'
      ],
      proxy: 'http://localhost:3000',
      port: 5000
    });
  };
}
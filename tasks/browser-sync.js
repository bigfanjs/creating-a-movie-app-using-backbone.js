import browserSync from 'browser-sync';

export const bs = browserSync.create();
export default function () {
  return () => {
    bs.init({
      files: [
        'public/javascripts/**/*.js',
        'public/stylesheets/*.css',
        'public/index.html'
      ],
      proxy: 'http://localhost:3000',
      port: 5000
    });
  };
}
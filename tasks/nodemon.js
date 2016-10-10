import nodemon from 'nodemon';

import { bs } from './browser-sync';

const reload = bs.reload;

export default function () {
  return cb => {
    let called = false;

    nodemon({
      script: 'server.js',
      ignore: ['gulpfile.babel.js', '.babelrc', '/node_modules/']
    })
    .on('start', function () {
      if ( !called ) {
        cb();
        called = true;
      }
    })
    .on('restart', function () {
      setTimeout(() => {
        reload({ stream: false });
      }, 1000);
    });
  };
}
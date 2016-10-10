import karma from 'karma';

export const Server = karma.Server;
export default function () {
  return callback => {
    (new Server({
      configFile: 'karma.conf.js'
    }, callback)).start();
  };
}
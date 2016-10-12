import karma from 'karma';
import path from 'path';

export const Server = karma.Server;
export default function () {
  return callback => {
    (new Server({
      configFile: path.join(__dirname, '../karma.conf.js')
    }, callback)).start();
  };
}
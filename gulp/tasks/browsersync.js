import browserSync from 'browser-sync';
import { bsync as config } from '../config';

const server = browserSync.create();

const serverReload = (done) => {
  server.reload();
  done();
};

const serverStart = (done) => {
  server.init(config);
  done();
};

const serverStream = () => {
  server.stream();
};
/*
const serverWatch = (done) => {
  // server.watch()
};
*/
export { server, serverReload, serverStart, serverStream };

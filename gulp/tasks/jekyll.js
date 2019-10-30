import {
  spawn
} from 'child_process';
const log = require('fancy-log');

/**
 * Adapted from https://github.com/shakyShane/jekyll-gulp-sass-browser-sync
 *
 */
const jekyll = done =>
  spawn('bundle', ['exec', 'jekyll', 'build', '--incremental'], {
    stdio: 'inherit'
  })
  .on('error', error => log(error.message))
  .on('close', done);

const jekyllserve = done =>
  spawn('bundle', ['exec', 'jekyll', 'build', '--config=_config.yml,_config-dev.yml', '--incremental'], {
    stdio: 'inherit'
  })
  .on('error', error => log(error.message))
  .on('close', done);

export {
  jekyll,
  jekyllserve
};

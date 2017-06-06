import { spawn } from 'child_process';
import { gutil } from 'gulp-util';

/**
 * Adapted from https://github.com/shakyShane/jekyll-gulp-sass-browser-sync
 *
 */
const jekyll = done =>
  spawn('bundle', ['exec', 'jekyll', 'build', '--incremental'], { stdio: 'inherit' })
    .on('error', error => gutil.log(gutil.colors.red(error.message)))
    .on('close', done);

const jekyllserve = done =>
  spawn('bundle', ['exec', 'jekyll', 'build', '--config=_config.yml,_config-dev.yml', '--incremental'], { stdio: 'inherit' })
      .on('error', error => gutil.log(gutil.colors.red(error.message)))
      .on('close', done);

export { jekyll, jekyllserve };

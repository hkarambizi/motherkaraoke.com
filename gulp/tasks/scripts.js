import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import { dest } from 'gulp';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import gutil from 'gulp-util';
import assign from 'lodash.assign';

import { scripts as config } from '../config';

const browserifyOptions = {
  entries: [`${config.src}`],
  debug: true,
};
const opts = assign({}, watchify.args, browserifyOptions);
const b = watchify(browserify(opts));
b.transform('babelify');

const bundle = () => {
  gutil.log('lets bundle!');
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('scripts.min.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({ loadMaps: true })) // loads map from browserify file
    // Add transformation tasks to the pipeline here.
    // Add transformation tasks to the pipeline here.
    .pipe(uglify())
      .on('error', gutil.log)
    .pipe(sourcemaps.write()) // writes .map file
    .pipe(dest(config.dest.app))
    .pipe(dest(config.dest.jekyll));
};
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

export default bundle;

/* GULP PLUGINS
********** */
import { src, dest } from 'gulp';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import notify from 'gulp-notify';
import size from 'gulp-size';

/* DEPENDENCIES
********** */
import { server } from './browsersync';

/* config
********** */
import { styles as config } from '../config';

const styles = () => src(config.src)
  // Process the original sources
  .pipe(sourcemaps.init())
  .pipe(sass({
    includePaths: config.includePaths,
  })).on('error', notify.onError())
  // postcss & autoprefixer
  .pipe(postcss([
    autoprefixer(config.autoprefixer),
    cssnano(),
  ]))
  .pipe(rename({ extname: '.min.css' }))
  .pipe(size()) // Logs the minified file size to the console
  .pipe(sourcemaps.write()) // Add the map to modified source.
  .pipe(dest(config.dest.jekyll)) // save to jekyll destination directory - for browsersync
  // inject CSS into browser via browsersync
  .pipe(server.stream())
  .pipe(dest(config.dest.app)); // save to assets directory - for jekyll build

export default styles;

/* GULP PLUGINS
 ********** */
import {
  src,
  dest
} from 'gulp';
import svgSprite from 'gulp-svg-sprite';
const log = require('fancy-log');
/* config
 ********** */
import {
  svg as config
} from '../config';

const svg = () => src(config.src)
  .pipe(svgSprite(config.options))
  .on('error', (error) => {
    console.log(error);
  })
  .pipe(dest(config.dest.app));

export default svg;

/* GULP PLUGINS
********** */
import { src, dest, lastRun } from 'gulp';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import size from 'gulp-size';

import { images as config } from '../config';


const images = () => src(config.src, { since: lastRun(images) })
  .pipe(imagemin({
    progressive: true,
    use: [pngquant({
      quality: '65-75',
    })],
  }))
  .pipe(dest(config.dest.app))
  .pipe(dest(config.dest.jekyll))
  .pipe(size({ title: 'images:' }));

export default images;

import { watch, series } from 'gulp';
import styles from './styles';
import images from './images';
// import bundle from './scripts';
import svg from './svg';
import { jekyllserve } from './jekyll';
import { serverReload } from './browsersync';

import { watch as config } from '../config';

const watching = () => {
  // WATCH Jekyll related files
  watch(config.jekyll, series(jekyllserve, serverReload));

  // WATCH sass|scss --> styles
  watch(config.styles, styles);

  // WATCH js --> build:scripts:serve
  // watch(config.scripts, series(bundle, serverReload));

  // watch images --> images
  watch(config.images, series(images, serverReload));

  // watch svg --> svg
  watch(config.svg, series(svg, serverReload));
};

export default watching;

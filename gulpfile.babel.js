// /* GULP PLUGINS
//  ********** */
// import gulp from 'gulp';
// // import gutil from 'gulp-util';

// /* tasks
//  ********** */
// import images from './gulp/tasks/images';
// import styles from './gulp/tasks/styles';
// import scripts from './gulp/tasks/scripts';
// import svg from './gulp/tasks/svg';
// import clean from './gulp/tasks/clean';
// import {
//   jekyll,
//   jekyllserve
// } from './gulp/tasks/jekyll';
// import * as server from './gulp/tasks/browsersync';
// import watch from './gulp/tasks/watch';

// /* config
//  ********** */
// // const env = gutil.env.env || 'development';

// const build = gulp.series(
//   clean,
//   gulp.parallel(images, styles, scripts, svg, jekyll),
// );

// const serve = gulp.series(
//   clean,
//   gulp.parallel(images, styles, scripts, svg, jekyllserve),
//   server.serverStart,
//   watch,
// );

// const def = (done) => {
//   // console.log(gutil.env.production); // true when --production passed
//   // console.log(env); // development
//   done();
// };
// export {
//   serve,
//   build
// };
// export default def;

/* GULP PLUGINS
 ********** */
import gulp from 'gulp';
import gutil from 'gulp-util';

/* tasks
 ********** */
import images from './gulp/tasks/images';
import styles from './gulp/tasks/styles';
import scripts from './gulp/tasks/scripts';
import svg from './gulp/tasks/svg';
import clean from './gulp/tasks/clean';
import {
  jekyll,
  jekyllserve
} from './gulp/tasks/jekyll';
import * as server from './gulp/tasks/browsersync';
import watch from './gulp/tasks/watch';

/* config
 ********** */
const env = gutil.env.env || 'development';

const build = gulp.series(
  clean,
  gulp.parallel(images, styles, scripts, svg, jekyll),
);

const serve = gulp.series(
  clean,
  gulp.parallel(images, styles, scripts, svg, jekyllserve),
  server.serverStart,
  watch,
);

const def = (done) => {
  console.log(gutil.env.production); // true when --production passed
  console.log(env); // development
  done();
};
export {
  serve,
  build
};
export default def;

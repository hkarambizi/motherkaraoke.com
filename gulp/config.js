const config = {};

config.app =     './',             // The files Jekyll will work on
config.dist =    '_site',          // The resulting static site
config.assets =  '_assets',        // The files Gulp will work on
config.nodedir = 'node_modules',   // npm directory for any external linked files

config.bsync = {
  server: {
    baseDir: config.dist, // the folder to serve
  },
  // Don't show any notifications in the browser.
  notify: false,
};

config.images = {
  src: `${config.assets}/images/**/*`,
  dest: {
    jekyll: `${config.dist}/assets/images`,
    app: `${config.app}assets/images`,
  },
};

config.scripts = {
  src: `${config.assets}/scripts/main.js`,
  dest: {
    jekyll: `${config.dist}/assets`,
    app: `${config.app}assets`,
  },
};

config.styles = {
  src: `${config.assets}/styles/styles.scss`,
  dest: {
    jekyll: `${config.dist}/assets`,
    app: `${config.app}assets`,
  },

  includePaths: [
    `${config.assets}/styles`,
    `${config.nodedir}/normalize.css`,
    `${config.nodedir}/bourbon/app/assets/stylesheets`,
    `${config.nodedir}/breakpoint-sass/stylesheets`,
    `${config.nodedir}/typi/scss`,
    `${config.nodedir}/modularscale-sass/stylesheets`,
  ],

  autoprefixer: {
    browsers: [
      'last 2 versions',
      'safari 5',
      'ie 8',
      'ie 9',
      'opera 12.1',
      'ios 6',
      'android 4',
    ],
    cascade: true,
  }
};

config.svg = {
  src: `${config.assets}/svg/**/*`,
  dest: {
    app: `${config.app}_includes`,
    fallback: `${config.dist}/assets/images/png_fallback`,
  },

  options: {
    svg: {
      xmlDeclaration: false,
      doctypeDeclaration: false,
    },

    mode: {
      inline: true,     // Prepare for inline embedding
      symbol: true,      // Create a «symbol» sprite
    },
  }
};

config.watch = {
  styles: `${config.assets}/styles/**/*.+(sass|scss)`,
  scripts: `${config.assets}/scripts/**/*.js`,
  images: `${config.assets}/images/**/*.+(jpg|png|jpeg|gif)`,
  jekyll: [
    '_config.yml',
    '_layouts/*',
    '_includes/*',
    '_data/*.+(yml|yaml|csv|json)',
    '**/*.html', '**/*.md', '!_site/**/*.*',
    '_games/*',
  ],
};

config.jekyll = {
  paths: [
    '_config.yml',
    '_layouts/*',
    '_includes/*',
    '_data/*.+(yml|yaml|csv|json)',
    '**/*.html', '**/*.md', '!_site/**/*.*',
  ],
};

module.exports = config;

import del from 'del';
import config from '../config';

/* eslint no-underscore-dangle: ["error", { "allow": ["_site"] }]*/
const clean = () => del([`${config._site}/**`, `!${config._site}`]);

export default clean;

// Only deletes what's in the site folder but not the folder itself
// return plugins.del(['_site/**', '!_site']);

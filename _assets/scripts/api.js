import axios from 'axios';
import Fusejs from 'fuse.js';

import PubSub from './pubsub';
import { groupBy } from './helpers/underscore';

let fuse;

// Initialize fuse.js options
const fuseOptions = {
  shouldSort: true,
  threshold: 0.1,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    'artist',
    'title',
  ],
};

// https://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript
// https://stackoverflow.com/questions/5421253/sort-javascript-array-of-objects-based-on-one-of-the-objects-properties
const sortSongs = (songList) => {
  const sorted = songList.sort((a, b) => {
    const alc = a.artist.toLowerCase();
    const blc = b.artist.toLowerCase();
    if (alc > blc) {
      return 1;
    } else if (alc < blc) {
      return -1;
    }
    return 0;
  });
  return sorted;
};

function groupSongs(songList) {
  const grouped = groupBy(songList, 'artist');
  return grouped;
}

function filterByLetter(songList, letter) {
  const filt = songList.filter(item => item.artist.toString().charAt(0) === letter);
  return filt;
}


function filterByTerm(songList, searchTerm) {
  fuse = new Fusejs(songList, fuseOptions);
  const fuseResults = fuse.search(searchTerm);
  return fuseResults;
}

export function searchByName(searchTerm) {
  PubSub.publish('searchStart', { searchTerm });
  return axios.get('search_data.json')
    .then(results => filterByTerm(results.data, searchTerm))
    .then(sortSongs)
    .then(groupSongs)
    .catch((error) => {
      console.error(error);
    });
}

export function findArtistsByLetter(letter) {
  PubSub.publish('searchStart', { letter });
  return axios.get('search_data.json')
    .then(results => filterByLetter(results.data, letter))
    .then(sortSongs)
    .then(groupSongs)
    // .then(results => sortSongs(results, letter))
    .catch((error) => {
      console.error(error);
    });
}
/*
function search() {
  axios.get('search_data.json')
  .then((response) => {
    loadr.style.display = 'none';
    const data = response.data;
    const filt = data.filter(item => item.artist.toString().charAt(0) === this.dataset.letter);

    PubSub.publish('updateList', { list: filt });

    displaySearchResults(filt);
  })
  .catch((error) => {
    console.log(error);
  });
}

function sortSongs(results, letter) {
  console.log('sortSongs');
  const allSongs = results.data;
  const filteredSongs = allSongs.filter(item => item.artist.toString().charAt(0) === letter);

  const songlistSorted = filteredSongs.sort((a, b) => b.artist - a.artist);
  const songlistGrouped = groupBy(songlistSorted, 'artist');

  return songlistGrouped;
}

*/

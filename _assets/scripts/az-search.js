import { delegateEventListener } from './helpers/events';
import PubSub from './pubsub';
import * as api from './api';

const letterMenuContainer = document.querySelector('.az-search');

function letterClickHandler(evt) {
  const e = evt || window.event;
  e.preventDefault();

  const theLetter = this.dataset.letter;


  api.findArtistsByLetter(theLetter)
    .then((songList) => {
      PubSub.publish('searchComplete', songList);
    });
}

function initLetterMenu() {
  const letters = 'qwertyuiopasdfghjklzxcvbnm';
  const uppercaseLetters = letters.toUpperCase();
  const letterList = [...uppercaseLetters];
  const sortedList = letterList.sort();
  const htmlList = sortedList.map(item => `<li class="o-list-inline__item c-az__item"><a class="c-az__letter" data-letter="${item}">${item}</a></li>`).join('');
  // container.innerHTML = `<ul class="o-list-inline c-az">${htmlList}</ul>`;
  // const letter = document.querySelectorAll('.letter');

  // letter.forEach(lett => lett.addEventListener('click', letterClickHandler));
  return `<ul class="o-list-inline c-az">${htmlList}</ul>`;
}

letterMenuContainer.innerHTML = initLetterMenu();
delegateEventListener(letterMenuContainer, 'click', 'a', letterClickHandler);

import * as firebase from "firebase";
import { delegateEventListener } from "./helpers/events";
import PubSub from "./pubsub";
import * as api from "./api";

// Initialize Firebase
// var config = FIREBASE_CONFIG;
// TO-DO: Control access to secure variables
var config = {
  apiKey: "AIzaSyDveRydLsydAnfe3Zb64zoAtO_SifUJyII",
  authDomain: "bored-games-manager.firebaseapp.com",
  databaseURL: "https://bored-games-manager.firebaseio.com",
  projectId: "bored-games-manager",
  storageBucket: "bored-games-manager.appspot.com",
  messagingSenderId: "128757415908"
};
firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

const letterMenuContainer = document.querySelector(".az-search");
const songTitles = document.getElementById("js-search_results");
const form = document.getElementById("sign-up");
var selectedArtist = document.getElementById("js-artist__input");
var selectedSong = document.getElementById("js-song__input");
var name = document.getElementById("js-name__input");
var phone = document.getElementById("js-phone__input");
var search = document.querySelector(".c-searchform__inputs");
var searchInput = document.querySelector(".c-searchform__input");
const searchForm = document.querySelector("#js-songsearch");
// Code for Song Request Submit
const requestForm = document.querySelector("#js-songpick");

function getSong(e) {
  return e.target;
}

var selection = function(title, artist, name, phone) {
  this.title = title;
  this.artist = artist;
  this.name = name;
  this.phone = phone;
};

function fillForm(obj) {
  form.classList.remove("u-hidden");
  selectedArtist.value = obj.artist;
  selectedSong.value = obj.title;
}

function resetForm(e) {
  name.value = "";
  phone.value = "";
  form.classList.add("u-hidden");
  console.log("reset form");
}

function getData(e) {
  var title, artist, artistSongs;
  title = e.target;
  artistSongs = title.parentNode.parentNode;
  artist = artistSongs.previousSibling;
  console.log(title.textContent);
  console.log(artist.textContent);
  var data = new selection(
    title.textContent,
    artist.textContent,
    name.value ? name.value : "",
    phone.value ? phone.value : ""
  );
  console.log(data);
  fillForm(data);
}

function disableSubmit() {
  var submitButton = document.querySelector(".c-pickform__submit");
  submitButton.disabled = true;
}

function submitRequest(evt) {
  const e = evt || window.event;
  e.preventDefault();
  disableSubmit();

  if (selectedArtist.value === "" || selectedSong.value === "") {
    form.previousSibling.innerHTML = "Please fill out all of the fields";
  } else {
    const now = new Date();
    var request = Object.assign({
      name: name.value.trim().toLowerCase(),
      phone: phone.value.replace(/-/g, ""),
      artist: selectedArtist.value.trim(),
      song: selectedSong.value.trim(),
      created: firebase.firestore.Timestamp.fromDate(now),
      status: 'submitted'
    });
    db.collection("requests")
      .add(request)
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        db.collection("requests")
          .get()
          .then(querySnapshot => {
            console.log("Here are all current requests");
            querySnapshot.forEach(doc => {
              console.log("Request#: ", doc.id, doc.data());
            });
          });
        resetForm();
        searchForm.reset();
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
    console.log(request);

    return false;
  }
}

function letterClickHandler(evt) {
  const e = evt || window.event;
  e.preventDefault();

  const theLetter = this.dataset.letter;

  api.findArtistsByLetter(theLetter).then(songList => {
    PubSub.publish("searchComplete", {
      songList,
      searchTerm: theLetter
    });
  });
}

function initLetterMenu() {
  const letters = "qwertyuiopasdfghjklzxcvbnm";
  const uppercaseLetters = letters.toUpperCase();
  const letterList = [...uppercaseLetters];
  const sortedList = letterList.sort();
  const htmlList = sortedList
    .map(
      item =>
        `<li class="o-list-inline__item c-az__item"><a class="c-az__letter" data-letter="${item}">${item}</a></li>`
    )
    .join("");
  // container.innerHTML = `<ul class="o-list-inline c-az">${htmlList}</ul>`;
  // const letter = document.querySelectorAll('.letter');

  // letter.forEach(lett => lett.addEventListener('click', letterClickHandler));
  return `<ul class="o-list-inline c-az">${htmlList}</ul>`;
}

letterMenuContainer.innerHTML = initLetterMenu();
delegateEventListener(letterMenuContainer, "click", "a", letterClickHandler);
delegateEventListener(songTitles, "click", "a", getData);
// delegateEventListener(searchInput, 'focus', '.c-searchform__input', resetForm);
requestForm.addEventListener("submit", submitRequest);
searchInput.addEventListener("focus", resetForm);

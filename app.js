const wrong_letters = document.getElementById("wrong-letters");
const word = document.getElementById("word");
const popup_container = document.getElementById("popup-container");
const notification_container = document.getElementById(
  "notification-container"
);
const finalmessage = document.getElementById("final-message");
const playAgain = document.getElementById("play-button");
const figurePart = document.querySelectorAll(".figure-part");

const Allwords = [
  "programming",
  "interface",
  "wizard",
  "application",
  "template",
];
const correctLetters = [];
const wrongLetters = [];
let selectedWord = Allwords[Math.floor(Math.random() * Allwords.length)];
//console.log(selectedWord);

//display words
function displaywords() {
  word.innerHTML = `${selectedWord
    .split("")
    .map(
      (letter) => `
    <div class='letter'>${correctLetters.includes(letter) ? letter : ""}</div>
    `
    )
    .join("")}`;

  const finalword = word.innerText.replace(/\n/g, "");

  if (selectedWord === finalword) {
    popup_container.style.display = "flex";
    finalmessage.innerText = "You Have Won !!!!!!!";
  }
}

//printing wromg letters
function showWrongLetters() {
  wrong_letters.innerHTML = `
            <p>Wrong</p>
            <span>${wrongLetters}</span>`;

  //display figure parts
  figurePart.forEach((part, index) => {
    const error = wrongLetters.length;
    if (index < error) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  //to check if lost
  if (wrongLetters.length === figurePart.length) {
    //we lost
    popup_container.style.display = "flex";
    finalmessage.innerText = "You Have Lost play again to Win !!!!!!!";
  }
}

//after pressing keys to fill the blanks
window.addEventListener("keydown", () => {
  //console.log(event.keyCode);
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    //console.log(event.key);
    if (selectedWord.includes(event.key)) {
      if (!correctLetters.includes(event.key)) {
        correctLetters.push(event.key);
        // console.log(correctLetters);
      } else {
        notification_container.classList.add("show");
        setTimeout('notification_container.classList.remove("show")', 2000);
      }
    } else {
      if (!wrongLetters.includes(event.key)) {
        wrongLetters.push(event.key);
        showWrongLetters();
        // console.log(wrongLetters);
      } else {
        notification_container.classList.add("show");
        setTimeout('notification_container.classList.remove("show")', 2000);
      }
    }
  }

  displaywords();
});

//again start the game after pressing play again button
playAgain.addEventListener("click", () => {
  popup_container.style.display = "none";
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = Allwords[Math.floor(Math.random() * Allwords.length)];
  displaywords();
  showWrongLetters();
});

displaywords();

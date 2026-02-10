const keyboard = document.getElementById("keyboard")

// const letters = "abcdefghijklmnopqrstuvwxyz"
const letters = "qwertyuiopasdfghjklzxcvbnm"
const words = ["javascript", "hangman", "programming", "developer", "algorithm"]
const input = document.getElementById("guess-input")
const submit = document.getElementById("sBtn")
let currentGuess = 1
const maxGuesses = 6
const count = document.getElementById("guess-count")

const randomWord = words[Math.floor(Math.random() * words.length)]
//const winningWord = randomWord

console.log(randomWord)

letters.split("").forEach((letter) => {
  const key = document.createElement("button")
  key.textContent = letter.toUpperCase()
  key.classList.add("key")
  keyboard.appendChild(key)
})
// disable the button and instead of making a div or whatever having this is more convenient
const key = document.getElementById("keyboard")
key.setAttribute("disabled", "disabled")
key.style.pointerEvents = "none"

function updateGuessDisplay() {
  if (currentGuess < maxGuesses) {
    currentGuess++
    count.textContent = currentGuess + " / " + maxGuesses
  } else if (currentGuess <= maxGuesses) {
    alert("Game Over Word was: " + randomWord)
    window.location.href = "/lose.html"
  }
}

submit.addEventListener("click", () => {
  const guess = input.value.toLowerCase()
  if (guess === randomWord) {
    alert("Congratulations! You've guessed the word: " + randomWord)
    window.location.href = "/win.html"
  } else {
    alert("Sorry, that's not the correct word. Try again!")
    updateGuessDisplay()
  }
  console.log(guess)
  input.value = ""
})

// make an array of words and then randomly select one for the user to guess
// for testing purposes

const keyboard = document.getElementById("keyboard")

// const letters = "abcdefghijklmnopqrstuvwxyz"
const letters = "qwertyuiopasdfghjklzxcvbnm"
/* const words = ["javascript", "hangman", "programming", "developer", "algorithm"] */
const input = document.getElementById("guess-input")
const submit = document.getElementById("sBtn")
let currentGuess = 1
const maxGuesses = 6
const count = document.getElementById("guess-count")
const img = document.getElementById("hint-image")
const historyContainer = document.getElementById("history-container")

let randomWord = ""

async function setupGame() {
  let listRes = await axios.get("https://dog.ceo/api/breeds/list/all")

  let breeds = Object.keys(listRes.data.message)

  randomWord = breeds[Math.floor(Math.random() * breeds.length)]

  console.log(randomWord)

  let imgRen = await axios.get(
    `https://dog.ceo/api/breed/${randomWord}/images/random`
  )

  img.src = imgRen.data.message
}

setupGame()

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

function checkGuess(guess) {
  const result = []
  const minLen = Math.min(guess.length, randomWord.length)

  for (let i = 0; i < minLen; i++) {
    if (guess[i] === randomWord[i]) {
      result.push("correct")
    } else if (randomWord.includes(guess[i])) {
      result.push("present")
    } else {
      result.push("absent")
    }
  }

  for (let i = minLen; i < guess.length; i++) {
    result.push("absent")
  }

  return result
}

function updateKeyboard(guess, result) {
  const keys = document.querySelectorAll("#keyboard .key")

  keys.forEach((k) => {
    const letter = k.textContent.toLowerCase()

    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === letter) {
        k.classList.remove("correct", "present", "absent")
        k.classList.add(result[i])
      }
    }
  })
}

function addHistory(guess, result) {
  const row = document.createElement("div")
  row.classList.add("history-row")

  for (let i = 0; i < guess.length; i++) {
    const tile = document.createElement("div")
    tile.classList.add("history-tile")
    tile.classList.add(result[i])
    tile.textContent = guess[i].toUpperCase()
    row.appendChild(tile)
  }

  historyContainer.appendChild(row)
}

function updateGuessDisplay() {
  if (currentGuess < maxGuesses) {
    currentGuess++
    count.textContent = currentGuess + " / " + maxGuesses
  } else if (currentGuess <= maxGuesses) {
    alert("Game Over Word was: " + randomWord)
    window.location.href = "./lose.html"
  }
}

input.addEventListener("input", () => {
  input.value = input.value.toLowerCase().replace(/[^a-z]/g, "")
})

submit.addEventListener("click", () => {
  const guess = input.value.toLowerCase()

  if (guess.length === 0) {
    input.value = ""
    return
  }

  const result = checkGuess(guess)
  addHistory(guess, result)
  updateKeyboard(guess, result)

  if (guess === randomWord) {
    alert("Congratulations! You've guessed the word: " + randomWord)
    window.location.href = "./win.html"
  } else {
    alert("Sorry, that's not the correct word. Try again!")
    updateGuessDisplay()
  }

  console.log(guess)
  input.value = ""
})

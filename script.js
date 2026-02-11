// const letters = "abcdefghijklmnopqrstuvwxyz"
// const words = ["javascript", "hangman", "programming", "developer", "algorithm"]

const input = document.getElementById("guess-input")
const submit = document.getElementById("sBtn")
let currentGuess = 1
const maxGuesses = 6
const count = document.getElementById("guess-count")
const img = document.getElementById("hint-image")
const historyContainer = document.getElementById("history-container")
const wordLengthDisplay = document.getElementById("word-length")

let randomWord = ""

async function setupData() {
  let listRes = await axios.get("https://dog.ceo/api/breeds/list/all")

  let breeds = Object.keys(listRes.data.message)

  randomWord = breeds[Math.floor(Math.random() * breeds.length)]

  console.log(randomWord)

  wordLengthDisplay.textContent = "Word Length: " + randomWord.length

  let imgRen = await axios.get(
    `https://dog.ceo/api/breed/${randomWord}/images/random`
  )

  img.src = imgRen.data.message
}

setupData()

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
    count.textContent = "Guess Count: " + currentGuess + " / " + maxGuesses
  } else if (currentGuess <= maxGuesses) {
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

  if (guess === randomWord) {
    window.location.href = "./win.html"
  } else {
    updateGuessDisplay()
  }

  console.log(guess)
  input.value = ""
})

document.getElementById("play-btn").addEventListener("click", () => {
  window.location.href = "./game.html"
})

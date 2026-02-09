const keyboard = document.getElementById("keyboard")

// const letters = "abcdefghijklmnopqrstuvwxyz"
const letters = "qwertyuiopasdfghjklzxcvbnm"

letters.split("").forEach((letter) => {
  const key = document.createElement("button")
  key.textContent = letter.toUpperCase()
  key.classList.add("key")
  keyboard.appendChild(key)
})
// disable the button and instead of making a div or whatever having this is more convenient
const key = document.getElementById("keyboard")
key.setAttribute = "disabled"
key.style.pointerEvents = "none"

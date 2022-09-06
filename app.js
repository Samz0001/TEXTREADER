const textDisplay = document.querySelector("#text");
const speedBtn = document.querySelector("#speed");
const readBtn = document.querySelector(".read");
const pauseBtn = document.querySelector(".pause");
const stopBtn = document.querySelector(".stop");
let currentChar;
// Reading  Functionality
readBtn.addEventListener("click", function () {
  readText(textDisplay.value);
});

//pausing FUnction
pauseBtn.addEventListener("click", pauseText);

const utterance = new SpeechSynthesisUtterance();
utterance.addEventListener("end", function () {
  textDisplay.disabled = "false";
});

utterance.addEventListener("boundary", function (e) {
  currentChar = e.charIndex;
});
//Stoping FUnctionality

stopBtn.addEventListener("click", stopText);

//SPeed Input functionality
speedBtn.addEventListener("input", function () {
  stopText();
  readText(utterance.text.substring(currentChar));
});
// readText Function
function readText(testText) {
  if (speechSynthesis.paused && speechSynthesis.speaking) {
    return speechSynthesis.resume();
  }

  if (speechSynthesis.speaking) return;

  console.log(utterance);
  utterance.text = testText;
  utterance.rate = speedBtn.value || 1;
  textDisplay.disabled = true;
  speechSynthesis.speak(utterance);
}

// pauseText Function
function pauseText() {
  if (speechSynthesis.speaking) speechSynthesis.pause();
}

//stopText Function
function stopText() {
  speechSynthesis.resume();
  speechSynthesis.cancel();
}

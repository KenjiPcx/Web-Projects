const playBtn = document.querySelector("#play-btn")
const pauseBtn = document.querySelector("#pause-btn")
const stopBtn = document.querySelector("#stop-btn")
const textInput = document.querySelector("#text")
const speedInput = document.querySelector("#speed")

let currentCharIndex = 0;

playBtn.addEventListener("click", () => {
    const utterance = new SpeechSynthesisUtterance(textInput.value)
    utterance.addEventListener("end", () => {
        if (speechSynthesis.paused) {
            speechSynthesis.cancel()
            pauseBtn.innerHTML = "Pause"
        }
        textInput.disabled = false
        playBtn.disabled = false
    })
    utterance.addEventListener("boundary", e => {
        currentCharIndex = e.charIndex
    })
    textInput.disabled = true
    playBtn.disabled = true
    utterance.rate = speedInput.value || 1
    speechSynthesis.speak(utterance)
})

pauseBtn.addEventListener("click", () => {
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
        speechSynthesis.pause();
        pauseBtn.innerHTML = "Unpause";
    } else if (speechSynthesis.speaking && speechSynthesis.paused) {
        speechSynthesis.resume();
        pauseBtn.innerHTML = "Pause";
    }
})

stopBtn.addEventListener("click", () => {
    speechSynthesis.resume()
    speechSynthesis.cancel()
})

speedInput.addEventListener("input", () => {
    speechSynthesis.resume();
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(textInput.value);
    utterance.addEventListener("end", () => {
      textInput.disabled = false
      playBtn.disabled = false
    });
    utterance.addEventListener("boundary", (e) => {
      currentCharIndex = e.charIndex;
    });
    textInput.disabled = true
    playBtn.disabled = true
    utterance.text = textInput.value.substring(currentCharIndex);
    utterance.rate = speedInput.value
    speechSynthesis.speak(utterance)
})
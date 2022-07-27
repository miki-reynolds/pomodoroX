// UPDATE POMODORO
function handlePomo() {
  chrome.storage.local.get(["pomoTimer", "pomoOption"], (res) => {
    const timePomo = document.getElementById("time-pomo")
    const minutes = `${res.pomoOption - Math.ceil(res.pomoTimer / 60)}`.padStart(2, "0")
    let seconds = "00"
    if (res.pomoTimer % 60 != 0) {
      seconds = `${60 - res.pomoTimer % 60}`.padStart(2, "0")
      }
    timePomo.textContent = `${minutes}:${seconds}`
    
    // play/stop alarm sound
    if (res.pomoTimer === (60 * res.pomoOption - 1)) {
      document.getElementById("sound-pomo").play()
      pomoSound = document.getElementById("pomo-sound")
      pomoSound.classList.remove("d-none")
      pomoSound.addEventListener("click", () => {
        document.getElementById("sound-pomo").pause()
        pomoSound.classList.add("d-none")
      })
    }
  })  
}


// UPDATE SHORT BREAK
function handleShort() {
  chrome.storage.local.get(["shortTimer", "shortOption"], (res) => {
    // reflect the time left
    const timeShort = document.getElementById("time-short")
    const minutes = `${res.shortOption - Math.ceil(res.shortTimer / 60)}`.padStart(2, "0")
    let seconds = "00"
    if (res.shortTimer % 60 != 0) {
      seconds = `${60 - res.shortTimer % 60}`.padStart(2, "0")
    }
    timeShort.textContent = `${minutes}:${seconds}`

    // play/stop alarm sound
    if (res.shortTimer === (60 * res.shortOption - 1)) {
      document.getElementById("sound-short").play()
      shortSound = document.getElementById("short-sound")
      shortSound.classList.remove("d-none")
      shortSound.addEventListener("click", () => {
        document.getElementById("sound-short").pause()
        shortSound.classList.add("d-none")
      })
    }
  })
}


// UPDATE LONG BREAK
function handleLong() {
  chrome.storage.local.get(["longTimer", "longOption"], (res) => {
    const timeLong = document.getElementById("time-long")
    const minutes = `${res.longOption - Math.ceil(res.longTimer / 60)}`.padStart(2, "0")
    let seconds = "00"
    if (res.longTimer % 60 != 0) {
      seconds = `${60 - res.longTimer % 60}`.padStart(2, "0")
    }
    timeLong.textContent = `${minutes}:${seconds}`
        
    // play/stop alarm sound
    if (res.longTimer === (60 * res.longOption - 1)) {
      document.getElementById("sound-long").play()
      longSound = document.getElementById("long-sound")
      longSound.classList.remove("d-none")
      longSound.addEventListener("click", () => {
        document.getElementById("sound-long").pause()
        longSound.classList.add("d-none")
      })
    }
    })
}


// ------------------- INTERACTIVE FEATURES ------------------- \\
pomoBtn = document.getElementById("js-pomodoro")
pomoBtn.addEventListener("click", () => {
  document.getElementById("time-pomo").classList.remove("d-none")
  document.getElementById("time-short").classList.add("d-none")
  document.getElementById("time-long").classList.add("d-none")

  document.getElementById("start-pomo-btn").classList.remove("d-none")
  document.getElementById("start-short-btn").classList.add("d-none")
  document.getElementById("start-long-btn").classList.add("d-none")

  document.getElementById("reset-pomo-btn").classList.remove("d-none")
  document.getElementById("reset-short-btn").classList.add("d-none")
  document.getElementById("reset-long-btn").classList.add("d-none")

  handlePomo()
  setInterval(handlePomo, 1000)
})

shortBtn = document.getElementById("js-short-break")
shortBtn.addEventListener("click", () => {
  document.getElementById("time-pomo").classList.add("d-none")
  document.getElementById("time-short").classList.remove("d-none")
  document.getElementById("time-long").classList.add("d-none")

  document.getElementById("start-pomo-btn").classList.add("d-none")
  document.getElementById("start-short-btn").classList.remove("d-none")
  document.getElementById("start-long-btn").classList.add("d-none")

  document.getElementById("reset-pomo-btn").classList.add("d-none")
  document.getElementById("reset-short-btn").classList.remove("d-none")
  document.getElementById("reset-long-btn").classList.add("d-none")

  handleShort()
  setInterval(handleShort, 1000)
})

longBtn = document.getElementById("js-long-break")
longBtn.addEventListener("click", () => {
  document.getElementById("time-pomo").classList.add("d-none")
  document.getElementById("time-short").classList.add("d-none")
  document.getElementById("time-long").classList.remove("d-none")

  document.getElementById("start-pomo-btn").classList.add("d-none")
  document.getElementById("start-short-btn").classList.add("d-none")
  document.getElementById("start-long-btn").classList.remove("d-none")

  document.getElementById("reset-pomo-btn").classList.add("d-none")
  document.getElementById("reset-short-btn").classList.add("d-none")
  document.getElementById("reset-long-btn").classList.remove("d-none")

  handleLong()
  setInterval(handleLong, 1000)
})


startPomo = document.getElementById("start-pomo-btn")
startPomo.addEventListener("click", () => {
  chrome.storage.local.get(["pomoIsRunning"], (res) => {
    chrome.storage.local.set({
      pomoIsRunning: !res.pomoIsRunning,
    })
  })
})

startShort = document.getElementById("start-short-btn")
startShort.addEventListener("click", () => {
  chrome.storage.local.get(["shortIsRunning"], (res) => {
    chrome.storage.local.set({
      shortIsRunning: !res.shortIsRunning,
    })
  })
})

startLong = document.getElementById("start-long-btn")
startLong.addEventListener("click", () => {
  chrome.storage.local.get(["longIsRunning"], (res) => {
    chrome.storage.local.set({
      longIsRunning: !res.longIsRunning,
    })
  })
})

resetPomo = document.getElementById("reset-pomo-btn")
resetPomo.addEventListener("click", () => {
  chrome.storage.local.set({
    pomoTimer: 0, 
    pomoIsRunning: false,
  })
})

resetShort = document.getElementById("reset-short-btn")
resetShort.addEventListener("click", () => {
  chrome.storage.local.set({
    shortTimer: 0, 
    shortIsRunning: false,
  })
})

resetLong = document.getElementById("reset-long-btn")
resetLong.addEventListener("click", () => {
  chrome.storage.local.set({
    longTimer: 0, 
    longIsRunning: false,
  })
})


// ------------------- WINDOW ONLOAD------------------- \\
window.onload = function () {
  chrome.storage.local.get(["pomoIsRunning", "shortIsRunning", "longIsRunning"], (res) => {
    if (res.shortIsRunning == true) {
      shortBtn.click()
    }
    else if (res.longIsRunning == true) {
      longBtn.click()
    }
    else {
      pomoBtn.click()
    }
  })

  // THEME & SOUND ONLOAD  \\
  chrome.storage.local.get(["imageBackground", "alarmSound"], (res) => {
    document.querySelector(".bg-img").style.backgroundImage = `url(${res.imageBackground})`
    const sounds = document.querySelectorAll(".sound")
    if (res.alarmSound !== "/media/meow.mp3") {
      id = res.alarmSound.slice(32, -17)
      const sounds = document.querySelectorAll(".sound")
      sounds.forEach(sound => sound.setAttribute('src', `https://docs.google.com/uc?export=download&id=${id}`))
    } 
    else {
      res.alarmSound = "/media/meow.mp3"
      sounds.forEach(sound => sound.setAttribute('src', `${res.alarmSound}`))
    }
  })
}



// ------------------- EXTRAS ------------------- \\
// document.querySelector(`[data-sound="shortBreak"]`).play()
// document.querySelector(`[data-sound="shortBreak"]`).pause()
// const source = document.getElementById('sound-src')
// source.src = res.alarmSound
// document.getElementById("sound").setAttribute('src', `${res.alarmSound}`);
// document.getElementById("sound").setAttribute('src', `https://docs.google.com/uc?export=download&id=${id}`)
// https://drive.google.com/file/d/1j3zKMwwqUXu03sEnGIqR4YD-krSadrol/view?usp=sharing
// https://drive.google.com/file/d/1WFAzSSRDX9SAmMEhYKUya9VJOUw8s1My/view?usp=sharing
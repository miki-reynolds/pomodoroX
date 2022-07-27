const pomoOption = document.getElementById("pomo-option")
pomoOption.addEventListener("change", (event) => {
    const val = event.target.value
    if (val < 1 || val > 60) {
        pomoOption = 25
    }
})

const shortOption = document.getElementById("short-option")
shortOption.addEventListener("change", (event) => {
    const val = event.target.value
    if (val < 1 || val > 60) {
        shortOption = 5
    }
})

const longOption = document.getElementById("long-option")
longOption.addEventListener("change", (event) => {
    const val = event.target.value
    if (val < 1 || val > 60) {
        longOption = 10
    }
})

const imageBackground = document.getElementById("image-background")
imageBackground.addEventListener("change", (event) => {
    try {
        imageBackground = event.target.value
    } catch (err) {
        console.log(err.name)
    }
})

const alarmSound = document.getElementById("alarm-sound")
alarmSound.addEventListener("change", (event) => {
    try {
        alarmSound = event.target.value
    } catch (err) {
        console.log(err.name)
    }
})

const saveBtn = document.getElementById("save-btn")
saveBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        pomoIsRunning: false,
        pomoTimer: 0,
        pomoOption: pomoOption.value,

        shortIsRunning: false,
        shortTimer: 0,
        shortOption: shortOption.value,

        longIsRunning: false,
        longTimer: 0,
        longOption: longOption.value,

        imageBackground: imageBackground.value, 
        alarmSound: alarmSound.value
    })
})

chrome.storage.local.get(["pomoOption", "shortOption", "longOption", "imageBackground", "alarmSound"], (res) => {
    pomoOption.value = res.pomoOption
    shortOption.value = res.shortOption
    longOption.value = res.longOption
    imageBackground.value = res.imageBackground || "/media/shoto.jpg"
    alarmSound.value = res.alarmSound || "/media/meow.mp3"
})

// // Create Alarm
chrome.alarms.create("pomodoro", {
    periodInMinutes: 1 / 60,
})

chrome.alarms.onAlarm.addListener((alarm) => {
    chrome.action.setBadgeText({ text: '' });

    chrome.storage.local.get(["pomoIsRunning", "pomoTimer", "pomoOption", "shortIsRunning", "shortTimer", "shortOption", "longIsRunning", "longTimer", "longOption"], (res) => {
        if (res.pomoIsRunning) {
            chrome.action.setBadgeText({ text: 'ON' });
            let pomoIsRunning = true
            let pomoTimer = res.pomoTimer + 1
            if (pomoTimer === 60 * res.pomoOption) {
                this.registration.showNotification("Pomodoro X", {
                    body: `${res.pomoOption} Minute(s) Passed!`,
                    icon: "/media/logo.png",
                })
                pomoTimer = 0
                pomoIsRunning = false
            }
            console.log(pomoTimer)
            chrome.storage.local.set({
                pomoTimer,
                pomoIsRunning,
            })
        }
        else if (res.shortIsRunning) {
            chrome.action.setBadgeText({ text: 'ON' });
            let shortIsRunning = true
            let shortTimer = res.shortTimer + 1
            if (shortTimer === 60 * res.shortOption) {
                this.registration.showNotification("Pomodoro X", {
                    body: `${res.shortOption} Minute(s) Passed!`,
                    icon: "/media/logo.png",
                })
                shortTimer = 0
                shortIsRunning = false
            }
            console.log(shortTimer)
            chrome.storage.local.set({
                shortTimer,
                shortIsRunning,
            })
        }
        else if (res.longIsRunning) {
            chrome.action.setBadgeText({ text: 'ON' });
            let longIsRunning = true
            let longTimer = res.longTimer + 1
            if (longTimer === 60 * res.longOption) {
                this.registration.showNotification("Pomodoro X", {
                    body: `${res.longOption} Minute(s) Passed!`,
                    icon: "/media/logo.png",
                })
                longTimer = 0
                longIsRunning = false
            }
            console.log(longTimer)
            chrome.storage.local.set({
                longTimer,
                longIsRunning,
            })
        }
    })
})


// Set Values If Not Initiated
chrome.storage.local.get(["pomoIsRunning", "pomoTimer", "pomoOption", "shortIsRunning", "shortTimer", "shortOption", "longIsRunning", "longTimer", "longOption", "imageBackground", "alarmSound", ], (res) => {
    chrome.storage.local.set({
        pomoIsRunning: "pomoIsRunning" in res ? res.pomoIsRunning : false,
        pomoTimer: "pomoTimer" in res ? res.pomoTimer : 0,
        pomoOption: "pomoOption" in res ? res.pomoOption : 25,
        
        shortIsRunning: "shortIsRunning" in res ? res.shortIsRunning : false,
        shortTimer: "shortTimer" in res ? res.shortTimer : 0,
        shortOption: "shortOption" in res ? res.shortOption : 5,
        
        longIsRunning: "longIsRunning" in res ? res.longIsRunning : false,
        longTimer: "longTimer" in res ? res.longTimer : 0,
        longOption: "longOption" in res ? res.longOption : 10,

        imageBackground: "imageBackground" in res ? res.imageBackground : "/media/shoto.jpg", 
        alarmSound: "alarmSound" in res ? res.alarmSound : "/media/meow.mp3"

    })
})


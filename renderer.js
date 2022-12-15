const { ipcRenderer } = require('electron')
const Timer = require('timer.js')

function startWrok() {
  const timer = new Timer({
    ontick(ms) {
      updateTime(ms)
    },
    onend() {
      notification()
    }
  })
  timer.start(5)
}

function updateTime(ms) {
  let s = (ms / 1000).toFixed(0)
  const timeContainer = document.querySelector('#time-container')
  timeContainer.innerHTML = s
}

async function notification() {
  const res = await ipcRenderer.invoke('work-notification')
  if (res === 'rest') {
    setTimeout(() => {
      startWrok()
    }, 5000)
  } else if (res === 'work') {
    startWrok()
  }
}

startWrok()

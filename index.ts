const { app, BrowserWindow } = require('electron');
const remoteMain = require('@electron/remote/main');

remoteMain.initialize()

const createWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });
  remoteMain.enable(win.webContents)
  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  app.quit()
})

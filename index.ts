const { app, BrowserWindow, ipcMain } = require('electron');
const remoteMain = require('@electron/remote/main');

remoteMain.initialize()

ipcMain.on('msgToMain', (event, ...rest) => {
  event.reply('msgToRenderer', rest[0])
})

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

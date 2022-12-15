const { app, BrowserWindow, ipcMain, Notification } = require('electron');

const createWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  win.loadFile('index.html')
  handleIPC()
}
function handleIPC() {
  ipcMain.handle('work-notification', async function() {
    return new Promise((resolve) => {
      const notification = new Notification({
        title: '任务结束',
        subtitle: '是否开始休息',
        actions: [{type: 'button', text: '开始休息'}],
        closeButtonText: '继续工作'
      })
      notification.show();
      notification.on('action', () => {
        resolve('rest')
      })
      notification.on('close', () => {
        resolve('work')
      })
    })
  })
}

app.whenReady().then(() => {
  createWindow()
})

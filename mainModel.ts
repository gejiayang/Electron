let { BrowserWindow: modelBrowserWindow } = require('electron');

exports.makeWin = function() {
  let win = new modelBrowserWindow({
    nodeIntegration: true,
    contextIsolation: false,
  })
  return win;
}
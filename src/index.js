const { app, BrowserWindow, ipcMain } = require("electron");
const utils = require("./utils");

let mainWindow;
app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  mainWindow.loadFile("src/views/index.html");
});
ipcMain.on("open-file-dialog", () => utils.manageOpenFileDialog(mainWindow));
ipcMain.on("show-save-dialog", () => utils.manageShowSaveDialog(mainWindow));

ipcMain.on("process-finished", () => utils.manageProcessFinished(mainWindow));

if (process.env.NODE_ENV == "production") {
  mainWindow.setMenu(null);
}

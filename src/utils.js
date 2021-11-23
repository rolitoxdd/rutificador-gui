const { dialog } = require("electron");
const fs = require("fs");
function manageOpenFileDialog(mainWindow) {
  dialog
    .showOpenDialog(mainWindow, {
      properties: ["openFile"],
      filters: [
        { extensions: ["csv"], name: "CSV" },
        { extensions: ["txt"], name: "TXT" },
      ],
    })
    .then((result) => {
      if (result.canceled) {
        return;
      }
      mainWindow.webContents.send("selected-file", result.filePaths[0]);
    })
    .catch((err) => {
      console.error(err);
    });
}

function manageShowSaveDialog(mainWindow) {
  dialog
    .showSaveDialog(mainWindow, {
      properties: ["openFile"],
      filters: [
        { extensions: ["csv"], name: "CSV" },
        { extensions: ["txt"], name: "TXT" },
      ],
    })
    .then((result) => {
      if (result.canceled) {
        return;
      }

      mainWindow.webContents.send("selected-output", result.filePath);
    })
    .catch((err) => {
      console.error(err);
    });
}
function manageProcessFinished(mainWindow) {
  dialog.showMessageBox(mainWindow, {
    type: "info",
    title: "Process Finished",
    message: "Process finished",
    buttons: ["OK"],
  });
}

module.exports = {
  manageOpenFileDialog,
  manageShowSaveDialog,
  manageProcessFinished,
};

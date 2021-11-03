// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const ipc = require('electron').ipcMain;

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 350,
    height: 650,
    show: false,
    alwaysOnTop: false,   
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
      autoplayPolicy: "no-user-gesture-required",
      enableWebSQL: false,
      backgroundThrottling: false
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html');
  mainWindow.webContents.once('dom-ready', () => { mainWindow.show();});

  //mainWindow.webContents.openDevTools()
  mainWindow.on('close', (evt) => { evt.preventDefault();
    app.quit();
    process.exit(0); // XXX: make sure close actually closes the app, see: https://github.com/electron-userland/electron-forge/issues/545
  }); 


  ipc.on('invokeAction', (event, data) => {
    const result = processData(data);
    console.log("Action received!");
    event.sender.send('actionReply', result);
  });

  ipc.on('open-window', (event, fileName) => {
    console.log("Open window received");
    mainWindow.show();
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')  { app.quit(); process.exit(0); }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

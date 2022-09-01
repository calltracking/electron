// Modules to control application life and create native browser window
const {app, BrowserWindow, Tray, Menu, safeStorage} = require('electron')
const path = require('path')
const ipc = require('electron').ipcMain;

function configureAppMenu(mainWindow) {
  const template = [
     {
        label: 'File',
        submenu: [
          { role: 'quit' },
        ]
     },
     {
        label: 'Edit',
        submenu: [
          { role: 'undo' },
          { role: 'redo' },
          { type: 'separator' },
          { role: 'cut' },
          { role: 'copy' },
          { role: 'paste' }
        ]
     },
     {
        label: 'View',
        submenu: [
           { role: 'reload' },
           { type: 'separator' },
           { role: 'resetzoom' },
           { role: 'zoomin' },
           { role: 'zoomout' },
           { type: 'separator' },
           { role: 'togglefullscreen' }
        ]
     },
     {
        role: 'window',
        submenu: [
           { role: 'minimize' },
           { role: 'close' }
        ]
     },
     {
        role: 'help',
        submenu: [ { role: 'about' },
                   { label: "Force Reload", click: () => {
                    mainWindow.webContents.send('force-reload', {});
                   } },
                   { label: "Debug", click: () => {
                    mainWindow.webContents.send('open-debug', {});
                  } } ]
     }
  ];

  if (process.platform == 'darwin')  {
    template.unshift({
        label: 'CallTrackingMetrics',
        submenu: [
          { role: 'about' },
        ]
     })
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 420,
    height: 800,
    show: false,
    alwaysOnTop: false,
    resizable: true,
    autoHideMenuBar: false,
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
  configureAppMenu(mainWindow);

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

  return mainWindow;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  const { systemPreferences } = require('electron');
  if (typeof(systemPreferences.askForMediaAccess) == 'function') {
    systemPreferences.askForMediaAccess('microphone');
  }

  const mainWindow = createWindow();
  
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

// TODO: get tray menu items from login, dynamically update when incoming phone call and modify based on inbound/outbound call
// TODO: this is not showing up in the packaged app...
// TODO: https://api.calltrackingmetrics.com/api/v1/accounts/{account_id}/available_statuses?normalized=1
  tray = new Tray('./public/packaged-icons/icons/png/16x16.png');
  tray.setToolTip('Open Phone')
  tray.on('click', () => {
    console.log("clicked the tray");
    mainWindow.show();
  });
  /*
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Available', type: 'radio' , checked: true },
    { label: 'Not Available', type: 'radio' },
    { label: 'Custom Status A', type: 'radio'},
    { label: 'Custom Status B', type: 'radio' },
    { label: 'Custom Status C', type: 'radio' }
  ]);
  tray.setContextMenu(contextMenu)
  */
}).catch( (e) => {
  console.error("error in ready:", e.message);
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')  { app.quit(); process.exit(0); }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

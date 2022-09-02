const electron      = require('electron')
const path          = require('path')
const remote        = electron.remote
const {ipcRenderer} = require('electron');

onload = () => {
  const webview = document.querySelector('webview');

  webview.addEventListener('console-message', (e) => {
    const event_message = e.message; 
    if (event_message.includes("device incoming call:")) {
      ipcRenderer.send('open-window', 'pageTwo');
      new Notification("Incoming Call Notification", { body: JSON.stringify(e.message) }).onclick = () => {
        ipcRenderer.send('open-window', 'pageTwo');
      }
    }
  });

  webview.addEventListener('crashed', (e) => {
    webview.reloadIgnoringCache();
  });

  ipcRenderer.on('open-debug', (e,d) => {
    webview.openDevTools();
  });
  ipcRenderer.on('force-reload', (e,d) => {
    webview.reloadIgnoringCache();
  });
  ipcRenderer.on('credentials-ready', (e,d) => {
    webview.send("credentials-ready", d);
  });


}

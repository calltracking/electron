const electron      = require('electron')
const path          = require('path')
const remote        = electron.remote
const {ipcRenderer} = require('electron');

onload = () => {
  const webview = document.querySelector('webview')
  webview.addEventListener('console-message', (e) => {
    console.log('Guest page logged a message:', JSON.stringify(e))
    const CLICK_MESSAGE = 'Notification clicked'

    const event_message = e.message; 

  //   if(event_message.includes("got open panel:")){
  //     //Open Window automatically
  //     ipcRenderer.send('open-window', 'pageTwo');
  //     // 
  //     new Notification("Outgoing Call Initiated", { body: JSON.stringify(e.message) })
  //     .onclick = () => {
  //       ipcRenderer.send('open-window', 'pageTwo');
  //     }
  //   }


    if(event_message.includes("device incoming call:")){
      //Open Window automatically
      ipcRenderer.send('open-window', 'pageTwo');
      // 
      new Notification("Incoming Call Notification", { body: JSON.stringify(e.message) })
      .onclick = () => {
        ipcRenderer.send('open-window', 'pageTwo');
      }
    }

  //   new Notification("Dialer Notification", { body: JSON.stringify(e) })
  //   .onclick = () => {
  //     ipcRenderer.send('open-window', 'pageTwo');
  //   }
  })
}

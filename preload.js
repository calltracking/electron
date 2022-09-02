// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const {ipcRenderer} = require('electron');
window.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('#authentication')) {
    function saveCredentials(email,pass) {
      console.log("save username password");
      ipcRenderer.send('save-credentials', JSON.stringify({email: email, pass: pass}));
    }
    function loadCredentials() {
      console.log("wait for credentials-ready");
      ipcRenderer.on('credentials-ready', (e,d) => {
        const creds = JSON.parse(d);
        console.log("loaded credentials: ", creds);
        if (creds?.credentials?.email?.length && creds?.credentials?.pass.length) {
          document.querySelector('#user_login').value = creds?.credentials?.email;
          document.querySelector('#user_password').value = creds?.credentials?.pass;
        }
      });
      // trigger so we can get a credentials event
      ipcRenderer.send('load-credentials');
    }

    const submit_button = document.querySelector("#new_user input[type=submit]");
    const remember = document.createElement("div");
    remember.classList.add('card');
    submit_button.addEventListener('click', function() {
      if (remember.querySelector('input').checked) {
        saveCredentials(document.querySelector('#user_login').value, document.querySelector('#user_password').value);
      }
    });
    remember.innerHTML = "<label>Remember Password <input type='checkbox' checked/></label>"
    submit_button.after(remember);

    /*remember.querySelector('input').addEventListener('change', function() {
      // for debug
      //saveCredentials(document.querySelector('#user_login').value, document.querySelector('#user_password').value);
      loadCredentials();
    });*/

    loadCredentials();
  }
});

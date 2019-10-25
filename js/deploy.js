const fs = require('fs');
const homedir = require('os').homedir();
const Client = require('ssh2-sftp-client');

const node_ssh = require('node-ssh');
const nodeSsh = new node_ssh();

const config = require('config');
const hostname = config.get("Deploy.hostname");
const username = config.get("Deploy.user");
const remotePath = config.get("Deploy.remotePath");
const privateKeyFile = homedir + config.get("Deploy.pathPrivateKeyRel2Home");
const privateKey = fs.readFileSync(privateKeyFile, 'utf8');

console.log(' ');
console.log('***** Deployment START *********************************************');

const sshconfig = {
  host: hostname,
  user: username, 
  privateKey: privateKey
};

//Delete files from server
let newMode = 0o755;  // rwxr-xr-x
let client = new Client();

client.connect(sshconfig)
  .then(() => {
    console.log("delete " + remotePath);
    return client.rmdir(remotePath, true);
  })
  .then(() => {
    console.log("mkdir " + remotePath);
    return client.mkdir(remotePath, true);
  })
  .then(() => {
    console.log("chmod " + remotePath);
    return client.chmod(remotePath, newMode);
  })
  .then(() => {
    var client_end = client.end();

    console.log("Upload /site --> " + remotePath);

    nodeSsh.connect(sshconfig)
    .then(function() {
      nodeSsh.putDirectory('site', remotePath, {
        recursive: true,
        concurrency: 1
      }).then(function(status) {
        if (status) {
          console.log('--> Die Seite wurde erfolgreich übertragen.');
        }
        else {
          console.log('--> Die Seite wurde mit FEHLERN übertragen!!!');
        }
        console.log('***** Deployment ENDE **********************************************');
        console.log(' ');
        
        nodeSsh.dispose();
      }).catch(function(e) {
        console.error("--> Die Seite wurde mit FEHLERN übertragen!!! ---> " + e.message);
      })
    });
    
    return client_end;
  })
  .catch(err => {
    console.error(err.message);
  });



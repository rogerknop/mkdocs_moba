const fs = require('fs');
const homedir = require('os').homedir();
const Client = require('ssh2-sftp-client');
const node_ssh = require('node-ssh');
const nodeSsh = new node_ssh();

console.log(' ');
console.log('***** Deployment START *********************************************');

const privateKeyFile = homedir + '/.ssh/id_rsa';
const privateKey = fs.readFileSync(privateKeyFile, 'utf8');

const config = {
  host: 'ftp.dieknops.de',
  user: 'dieknops', 
  privateKey: privateKey
};

//Delete files from server
let remoteDir = '/httpdocs/moba';
let newMode = 0o755;  // rwxr-xr-x
let client = new Client();

client.connect(config)
  .then(() => {
    console.log("delete " + remoteDir);
    return client.rmdir(remoteDir, true);
  })
  .then(() => {
    console.log("mkdir " + remoteDir);
    return client.mkdir(remoteDir, true);
  })
  .then(() => {
    console.log("chmod " + remoteDir);
    return client.chmod(remoteDir, newMode);
  })
  .then(() => {
    var client_end = client.end();

    console.log("Upload /site --> " + remoteDir);

    nodeSsh.connect(config)
    /*{
      host: 'ftp.dieknops.de',
      username: 'dieknops', 
      privateKey: privateKey
    })*/
    .then(function() {
      nodeSsh.putDirectory('site', remoteDir, {
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



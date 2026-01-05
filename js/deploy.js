const fs = require('fs');
const homedir = require('os').homedir();
const Client = require('ssh2-sftp-client');

const {NodeSSH} = require('node-ssh')
const nodeSsh = new NodeSSH()

const config = require('config');
const hostname = config.get("Deploy.hostname");
const username = config.get("Deploy.user");
const remotePath = config.get("Deploy.remotePath");
const privateKeyFile = homedir + config.get("Deploy.pathPrivateKeyRel2Home");
const privateKey = fs.readFileSync(privateKeyFile, 'utf8');

if (fs.existsSync("site/htaccess") && fs.existsSync("site/htpasswd")) {
  console.log(' ');
  console.log('Rename htaccesss->.htaccess & htpasswd->.htpasswd before deploying...');
  fs.renameSync("site/htaccess", "site/.htaccess");
  fs.renameSync("site/htpasswd", "site/.htpasswd");
}

console.log(' ');
console.log('***** Deployment START *********************************************');

//user => ftp
//username => ssh
const sshconfig = {
  host: hostname,
  user: username, 
  username: username, 
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
        concurrency: 10,
        validate: function(itemPath) {
          //console.log(itemPath);
          //const baseName = path.basename(itemPath)
          return true;
        },
        tick: function(localPath, remotePath, error) {
          if (error) {
            //console.log("ERROR!!! - " + localPath +  " / " + error);
          } else {
            //console.log("ok... " + localPath);
          }
        }
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



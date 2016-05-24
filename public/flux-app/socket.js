/*
const config = {
"domain":"mantis-ranson.rhcloud.com",
"serverip":"127.9.72.129",
"serverport":"8080",
"clientport":"8000",
"protocol":"ws://",
"wsclientopts":{
  "reconnection":true,
  "reconnectionDelay":2000,
  "reconnectionAttempts":100,
  "secure":false
  }
};
*/

const config = {
  "domain": '127.0.0.1',
  "serverip": '127.0.0.1',
  "serverport": '8080',
  "clientport": '8080',
  "protocol":   'ws://',
  "wsclientopts": { reconnection: false, 
                    reconnectionDelay: 2000,
                    reconnectionAttempts: 100,
                    secure: false
                  }
};

const connString = config.protocol + config.domain + ':' + config.clientport;

const socket = io.connect(connString, config.wsclientopts);      

export default socket;

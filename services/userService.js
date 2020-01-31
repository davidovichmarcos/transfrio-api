var log = require('loglevel');
var firebase = require("firebase/app");
require('firebase/auth');
require('firebase/database');

const writeUserData = function (user) {
    const timestamp = Date.now();
    firebase.database().ref('users/' + user.id).set({
        username: user.name,
        email: user.email,
    });
    log.info(`Data sent to FireBase correctly at ${timestamp}`);
}

module.exports = {
    writeUserData
}
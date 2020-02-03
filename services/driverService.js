var log = require('loglevel');
var firebase = require("firebase/app");
require('firebase/auth');
require('firebase/database');

const writeDriverData = function (driver) {
    const timestamp = Date.now();
    firebase.database().ref('drivers/' + driver.driverId).set({
        name: driver.name,
        lastName: driver.lastName,
        document: driver.document,
        address: driver.address,
        phone: driver.phone
    });
    log.info(`Data sent to FireBase correctly at ${timestamp}`);
}

module.exports = {
    writeDriverData
}
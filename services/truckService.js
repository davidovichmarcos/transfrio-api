var log = require('loglevel');
var firebase = require("firebase/app");
require('firebase/auth');
require('firebase/database');

const writeTruckData = function (truck) {
    const timestamp = Date.now();
    firebase.database().ref('trucks/').push({
        licensePlate: truck.licensePlate,
        model: truck.model,
        brand: truck.brand,
        year: truck.year,
        driverId: truck.driverId
    });
    log.info(`Data sent to FireBase correctly at ${timestamp}`);
}

module.exports = {
    writeTruckData
}
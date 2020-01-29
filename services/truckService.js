var firebase = require("firebase/app");
require('firebase/auth');
require('firebase/database');

const writeTruckData = function (truck) {
    const timestamp = Date.now();
    firebase.database().ref('trucks/' + truck.truckId).set({
        licensePlate: truck.licensePlate,
        model: truck.model,
        brand: truck.brand,
        year: truck.year
    });
    console.log(`Data sent to FireBase correctly at ${timestamp}`);
}

module.exports = {
    writeTruckData
}
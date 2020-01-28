var firebase = require("firebase/app");
require('firebase/auth');
require('firebase/database');

const getData = async function (val) {
    const timestamp = Date.now();
    const snapshot = await firebase.database().ref(`/${val}`).once('value');
    console.log(`Data recibed correctly from FireBase at ${timestamp}`);
    return snapshot.val();
}

module.exports = {
    getData
}
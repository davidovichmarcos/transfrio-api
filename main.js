const truck  = require('./models/truck');
const express = require('express');
const app = express();
const port = process.env.port || 3000;
var firebase = require("firebase/app");
require('firebase/auth');
require('firebase/database');
 // Your web app's Firebase configuration
var firebaseConfig = require('./firebaseAuth.json');
 
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
app.listen(port,() => console.log(`Listening on port: ${port}`));

app.get('/', (req, res) => {
    res.status(200).send('Welcome to a transfrio api');
    console.log(truck);
    
    console.log(database);

    
 });
 
 app.get('/trucks',(req, res) => {
   writeTruckData(1, 'CTB997', 'Volvo', 'FM',1990);
  res.status(200).send('truck added!');
});

app.get('/drivers',(req, res) => {
  writeDriverData(1, 'Marcos', 'Davidovich', 39966575,'Italia 625');
 res.status(200).send('driver added!');
});

function writeTruckData(truckId, licensePlate, model, brand, year) {
  const timestamp = Date.now();
   firebase.database().ref('trucks/' + truckId).set({
    licensePlate: licensePlate, 
    model: model,
    brand: brand,
    year : year
  });
  
  console.log(`Data sent to FireBase correctly at ${timestamp}`);
}

function writeDriverData(driverId, name, lastName, document, address) {
  const timestamp = Date.now();
   firebase.database().ref('drivers/' + driverId).set({
    name: name, 
    lastName: lastName,
    document: document,
    address: address
  });
  
  console.log(`Data sent to FireBase correctly at ${timestamp}`);
}
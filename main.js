const truck = require('./models/truck');
var bodyParser = require('body-parser')

var express = require('express'),
  app = express(),
  port = parseInt(process.env.PORT, 10) || 3000;
var firebase = require("firebase/app");
require('firebase/auth');
require('firebase/database');
// Your web app's Firebase configuration
var firebaseConfig = require('./firebaseAuth.json');

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.listen(port, () => console.log(`Listening on port: ${port}`));


app.get('/', (req, res) => {
  res.status(200).send('Welcome to a transfrio api');
});

app.post('/trucks', (req, res) => {
  writeTruckData(req.body);
  res.status(200).send('truck added!');
});

app.post('/drivers', (req, res) => {
  writeDriverData(req.body);
  res.status(200).send('driver added!');
});

app.get('/drivers', (req, res) => {
  const timestamp = Date.now();
  getData(drivers);
  res.status(200).send(`Data sent to FireBase correctly at ${timestamp}`);
})
app.get('/trucks', (req, res) => {
  const timestamp = Date.now();
  getData(trucks);
  res.status(200).send(`Data sent to FireBase correctly at ${timestamp}`);
})

function getData(val) {
  return firebase.database.ref(`/${val}`).once('value').then(function(snapshot) {
    return snapshot.val();
  })
}

function writeTruckData(truck) {
  const timestamp = Date.now();
  firebase.database().ref('trucks/' + truck.truckId).set({
    licensePlate: truck.licensePlate,
    model: truck.model,
    brand: truck.brand,
    year: truck.year
  });

  console.log(`Data sent to FireBase correctly at ${timestamp}`);
}

function writeDriverData(driver) {
  const timestamp = Date.now();
  firebase.database().ref('drivers/' + driver.driverId).set({
    name: driver.name,
    lastName: driver.lastName,
    document: driver.document,
    address: driver.address
  });

  console.log(`Data sent to FireBase correctly at ${timestamp}`);
}
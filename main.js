var bodyParser = require('body-parser')

var express = require('express'),
  app = express(),
  port = parseInt(process.env.PORT, 10) || 2345;
var firebase = require("firebase/app");
require('firebase/auth');
require('firebase/database');
// Your web app's Firebase configuration
var firebaseConfig = require('./firebaseAuth.json');

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

app.use(bodyParser.urlencoded({ extended: false }))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');

  // authorized headers for preflight requests
  // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();

  app.options('*', (req, res) => {
      // allowed XHR methods  
      res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
      res.send();
  });
});
// parse application/json
app.use(bodyParser.json())

app.listen(port, () => console.log(`Listening on port: ${port}`));


app.get('/', (req, res) => {
  res.status(200).send('Welcome to a transfrio api');
});

app.post('/createTruck', (req, res) => {
  writeTruckData(req.body);
  res.status(201).send('truck added!');
});

app.post('/createDriver', (req, res) => {
  writeDriverData(req.body);
  res.status(201).send('driver added!');
});
app.post('/createUser', (req, res) => {
  writeUserData(req.body);
  res.status(201).send('user added!')
})

app.get('/drivers', (req, res) => {
  const timestamp = Date.now();
  getData(drivers);
  res.status(200).send(`Data recibed correctly from FireBase at ${timestamp}`);
})
app.get('/trucks', (req, res) => {
  const timestamp = Date.now();
  getData(trucks);
  res.status(200).send(`Data recibed correctly from FireBase at ${timestamp}`);
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
function writeUserData(user) {
  const timestamp = Date.now();
  firebase.database().ref('users/' + user.id).set({
    username: user.name,
    email: user.email,
  });
  console.log(`Data sent to FireBase correctly at ${timestamp}`);
  
}
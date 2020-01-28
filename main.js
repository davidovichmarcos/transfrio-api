var bodyParser = require('body-parser')
var express = require('express'),
  app = express(),
  port = parseInt(process.env.PORT, 10) || 2345;
var firebase = require("firebase/app");
require('firebase/auth');
require('firebase/database');
// Web app's Firebase configuration
var firebaseConfig = require('./firebaseAuth.json');

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

app.use(bodyParser.urlencoded({ extended: false }))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();

  app.options('*', (req, res) => {// allowed XHR methods  
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

app.post('/createUser', (req, res) => {
  writeUserData(req.body);
  res.status(201).send('user added!')
})

app.post('/createDriver', (req, res) => {
  writeDriverData(req.body);
  res.status(201).send('driver added!');
});

app.post('/createTruck', (req, res) => {
  writeTruckData(req.body);
  res.status(201).send('truck added!');
});

app.get('/getUsers', async ( req, res ) => {
  const timestamp = Date.now();
  const users = await getData('users');
  console.log(`Data recibed correctly from FireBase at ${timestamp}`);
  res.status(200).send(users);
}) 

app.get('/getDrivers', async (req, res) => {
  const timestamp = Date.now();
  const drivers = await getData('drivers');
  console.log(`Data recibed correctly from FireBase at ${timestamp}`);
  res.status(200).send(drivers);
})

app.get('/getTrucks', async ( req, res ) => {
  const timestamp = Date.now();
  const trucks  = await getData('trucks');
  console.log(`Data recibed correctly from FireBase at ${timestamp}`);
  res.status(200).send(trucks);
})

app.get('/getUserById/:id', async( req, res) => {
  const timestamp = Date.now();
  const user = await getData('users/' + req.params.id);
  console.log(`Data recibed correctly from FireBase at ${timestamp}`);
  res.status(200).send(user);
})

app.get('/getDriverById/:id', async (req, res) => {
  const timestamp = Date.now();
  const driver = await getData('drivers/'+ req.params.id);
  console.log(`Data recibed correctly from FireBase at ${timestamp}`);
  res.status(200).send(driver);
})

app.get('/getTruckById/:id', async (req, res) => {
  const timestamp = Date.now();
  const truck = await getData('trucks/'+ req.params.id);
  console.log(`Data recibed correctly from FireBase at ${timestamp}`);
  res.status(200).send(truck);
})

async function getData(val) {
  const snapshot = await firebase.database().ref(`/${val}`).once('value');
  return snapshot.val();
}

function writeUserData(user) {
  const timestamp = Date.now();
  firebase.database().ref('users/' + user.id).set({
    username: user.name,
    email: user.email,
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
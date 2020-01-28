const baseService = require('./services/baseService')
const userService = require('./services/userService')
const driverService = require('./services/driverService')
const truckService = require('./services/truckService')
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
  userService.writeUserData(req.body);
  res.status(201).send('user added!')
})

app.post('/createDriver', (req, res) => {
  driverService.writeDriverData(req.body);
  res.status(201).send('driver added!');
});

app.post('/createTruck', (req, res) => {
  truckService.writeTruckData(req.body);
  res.status(201).send('truck added!');
});

app.get('/getUsers', async (req, res) => {
  const users = await baseService.getData('users');
  res.status(200).send(users);
})

app.get('/getDrivers', async (req, res) => {
  const drivers = await baseService.getData('drivers');
  res.status(200).send(drivers);
})

app.get('/getTrucks', async (req, res) => {
  const trucks = await baseService.getData('trucks');
  res.status(200).send(trucks);
})

app.get('/getUserById/:id', async (req, res) => {
  const user = await baseService.getData('users/' + req.params.id);
  res.status(200).send(user);
})

app.get('/getDriverById/:id', async (req, res) => {
  const driver = await baseService.getData('drivers/' + req.params.id);
  res.status(200).send(driver);
})

app.get('/getTruckById/:id', async (req, res) => {
  const truck = await baseService.getData('trucks/' + req.params.id);
  res.status(200).send(truck);
})
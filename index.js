// index.js

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Load pre existing devices from devices.json on startup
let devices = loadDevices();

// writing a Function to load existing devices from devices.json
function loadDevices() {
  try {
    const devicesData = fs.readFileSync('devices.json', 'utf8');
    return JSON.parse(devicesData);
  } catch (error) {
    console.error('Error loading devices:', error);
    return [];
  }
}

// Function to save the devices to the file devices.json
function saveDevices() {
  fs.writeFileSync('devices.json', JSON.stringify(devices), 'utf8');
}

// Function to log activities with timestamps to logs.txt
function logData(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  fs.appendFileSync('logs.txt', logMessage, 'utf8');
}

// Endpoint given to register a new device
app.post('/register', (req, res) => {
  const { deviceId, deviceType } = req.body;

  if (!deviceId || !deviceType) {
    return res.status(400).json({ error: 'Device ID and Device Type are required.' });
  }

  // Check if the device with similar ID already exists
  if (devices.some(device => device.deviceId === deviceId)) {
    return res.status(409).json({ error: 'Device with the same ID already exists.' });
  }

  const newDevice = { deviceId, deviceType };
  devices.push(newDevice);
  saveDevices();

  // Log the registration activity
  logData(`Device registered - Device ID: ${deviceId}, Device Type: ${deviceType}`);

  return res.status(201).json({ message: 'Device registered successfully.' });
});

// Endpoint to display all registered devices
app.get('/show', (req, res) => {
  return res.json(devices);
});

// Endpoint to receive data from devices
app.post('/data', (req, res) => 
  {const { deviceId, data } = req.body;

  if (!deviceId || !data) {
    return res.status(400).json({ error: 'Device ID and Data are required.' });
  }

  // Logging the received data with timestamp
  logData(`Data received - Device ID: ${deviceId}, Data: ${data}`);

  return res.json({ message: 'Data received successfully.' });
});

// Endpoint to send commands to devices
app.post('/command', (req, res) => {
  const { deviceId, command } = req.body;

  if (!deviceId || !command) {
    return res.status(400).json({ error: 'Device ID and Command are required.' });
  }

  // Log the sent command with timestamp
  logData(`Command sent - Device ID: ${deviceId}, Command: ${command}`);

  return res.json({ message: 'Command sent successfully.' });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

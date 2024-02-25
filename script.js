// public/script.js

// Function to register a new device
function registerDevice() {
    const deviceId = document.getElementById('deviceId').value;
    const deviceType = document.getElementById('deviceType').value;
  
    // Display the registered device in the table
    displayRegisteredDevice({ deviceId, deviceType });
  
    // Call the server endpoint to register the device
    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ deviceId, deviceType }),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error registering device:', error));
  }
  
  // Function to send data to a device
  function sendData() {
    const dataDeviceId = document.getElementById('dataDeviceId').value;
    const data = document.getElementById('data').value;
  
    // Log the sent data (you can implement this based on your needs)
    console.log(`Data sent to ${dataDeviceId}: ${data}`);
  
    // Call the server endpoint to send data
    fetch('http://localhost:3000/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ deviceId: dataDeviceId, data }),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error sending data:', error));
  }
  
  // Function to send a command to a device
  function sendCommand() {
    const commandDeviceId = document.getElementById('commandDeviceId').value;
    const command = document.getElementById('command').value;
  
    // Log the sent command (you can implement this based on your needs)
    console.log(`Command sent to ${commandDeviceId}: ${command}`);
  
    // Call the server endpoint to send a command
    fetch('http://localhost:3000/command', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ deviceId: commandDeviceId, command }),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error sending command:', error));
  }
  
  // Function to display all registered devices on page load
  function displayAllDevices() {
    // Call the server endpoint to get all registered devices
    fetch('http://localhost:3000/show')
      .then(response => response.json())
      .then(devices => {
        devices.forEach(device => displayRegisteredDevice(device));
      })
      .catch(error => console.error('Error fetching registered devices:', error));
  }
  
  // Function to display a registered device in the table
  function displayRegisteredDevice(device) {
    const devicesTableBody = document.getElementById('devicesTableBody');
    const row = document.createElement('tr');
    row.innerHTML = `<td>${device.deviceId}</td><td>${device.deviceType}</td>`;
    devicesTableBody.appendChild(row);
  }
  
  // Load all registered devices on page load
  displayAllDevices();
  
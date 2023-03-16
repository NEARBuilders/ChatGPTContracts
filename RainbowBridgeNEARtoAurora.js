const fetch = require('node-fetch');

// Define the NEAR account and amount to bridge
const nearAccount = 'your_near_account';
const amount = '1000000000000000000'; // 1 NEAR

// Define the Aurora address to receive the bridged NEAR
const auroraAddress = 'your_aurora_address';

// Define the Rainbow Bridge API endpoint
const bridgeEndpoint = 'https://bridge-api.mainnet.near.org';

// Define the bridge method and parameters
const method = 'eth.near_bridge';
const params = {
  'near_sender': nearAccount,
  'near_amount': amount,
  'ethereum_receiver': auroraAddress
};

// Make the API request to the Rainbow Bridge endpoint
fetch(bridgeEndpoint, {
  method: 'POST',
  body: JSON.stringify({
    jsonrpc: '2.0',
    id: 0,
    method,
    params
  }),
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data.result))
.catch(error => console.error(error));

import handler from './coin-list.js';

// Simulate a request and response object
const req = {};
const res = {
  status: (code) => {
    return {
      json: (data) => {
        console.log('Status:', code);
        console.log('Data:', JSON.stringify(data, null, 2));
      }
    };
  }
};

handler(req, res);
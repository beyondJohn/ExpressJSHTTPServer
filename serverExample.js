////////////////////////////////////////////////////////////
// Begin Get Dependencies
//

const express = require('express');

const path = require('path');

//const http = require('http');
//For HTTP, not HTTPS connection uncomment the
// above code and replace reference throughout file
// replacing "https" with "http" & delete option const lines
// 15-17 starting with "key" ending with "ca" lines.

const bodyParser = require('body-parser');

const https = require('https');

const fs = require('fs');

//
// End Get Dependecies
////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
// Begin server configuration
//
const options = {
  hostname: 'switchmagic.com',
  key: fs.readFileSync('/etc/letsencrypt/live/switchmagic.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/switchmagic.com/cert.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/switchmagic.com/chain.pem')
};

// Get our API routes
const api = require('./server/routes/api');

// !!Read Before Continuing!! //

//A .server/routes directory must be created prior to running.
//A Javascript file named api.js with contents 
// which can be found commented out at the end
// of this file, must be placed into 
// ./server/routes directory
// The dot in this case is the directory which is the same dirctory 
// this file is stored, which should be the main folder
// containing every other of the app's files and folders.

//  Continue //

//Declare "app" as Express 
const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Print to pdf
app.get('/3', (req, res) => {
  res.sendFile(path.join(__dirname, './index1.html'));
});

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index1.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3600';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = https.createServer(options, app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));

//
// End server configuration
/////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////
//Begin api.js file contents
// 

//const express = require('express');
//const router = express.Router();
//// GET api listing. 
//router.get('/', (req, res) => {
//  res.send('api works');
//});
//module.exports = router;

//
//End api.js contents
/////////////////////////////////////////////////////////

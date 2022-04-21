// Place your server entry point code here
// Dependencies
const express = require('express')
const app = express()

const cors = require('cors') // Add cors dependency
app.use(cors()) // Set up cors middleware on all endpoints
const db = require("./src/services/database.js")
app.use(express.urlencoded({ extended: true }))
app.use(express.json()) // Allow JSON body messages on all endpoints

app.use(express.static('./public')) // Serve static HTML files

const morgan = require('morgan')
const fs = require('fs')

const args = require("minimist")(process.argv.slice(2))


const port = args.port || process.env.PORT || 5000

// Start an app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', port))
});

const help = (`
server.js [options]
--port, -p	Set the port number for the server to listen on. Must be an integer
            between 1 and 65535.
--debug, -d If set to true, creates endlpoints /app/log/access/ which returns
            a JSON access log from the database and /app/error which throws 
            an error with the message "Error test successful." Defaults to 
            false.
--log		If set to false, no log files are written. Defaults to true.
            Logs are always written to database.
--help, -h	Return this message and exit.
`)
// If --help, echo help text and exit
if (args.help || args.h) {
    console.log(help)
    process.exit(0)
}

// logging
app.use(express.static('./public'))

if (args.log == true) {
    const accessLog = fs.createWriteStream('./data/log/access.log', { flags: 'a' })
    app.use(morgan('combined', { stream: accessLog }))
}

// Define default endpoint
app.get('/app/', (req, res) => {
    // Respond with status 200
    res.statusCode = 200;
    // Respond with status message "OK"
    res.statusMessage = 'OK';
    res.writeHead(res.statusCode, { 'Content-Type': 'text/plain' });
    res.end('{"message":"Your API works! ('+ res.statusCode +')"}')
});

// bring in routes 
app.use(require('./src/routes/someroutes.js'))

// Debug endpoints
if (args.debug) {
    app.use(require('./src/routes/someMoreRoutes.js'))
}

// Default response for any other request
app.use(function (req, res) {
    res.status(404).send('404 NOT FOUND')
});

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Server stopped')
    })
});


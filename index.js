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
if (args.log == true) {
    const accessLog = fs.createWriteStream('access.log', { flags: 'a' })
    app.use(morgan('combined', { stream: accessLog }))
}

// Middleware
app.use((req, res, next) => {

    let logdata = {
        remoteaddr: req.ip,
        remoteuser: req.user,
        time: Date.now(),
        method: req.method,
        url: req.url,
        protocol: req.protocol,
        httpversion: req.httpVersion,
        status: res.statusCode,
        referer: req.headers["referer"],
        useragent: req.headers["user-agent"],
    };

    const stmt = db.prepare('INSERT INTO accesslog (remoteaddr, remoteuser, time, method, url, protocol, httpversion, status, referer, useragent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
    const info = stmt.run(logdata.remoteaddr, logdata.remoteuser, logdata.time, logdata.method, logdata.url, logdata.protocol, logdata.httpversion, logdata.status, logdata.referer, logdata.useragent)

    next();
});


// Define default endpoint
app.get('/app/', (req, res) => {
    // Respond with status 200
    res.statusCode = 200;
    // Respond with status message "OK"
    res.statusMessage = 'OK';
    res.writeHead(res.statusCode, { 'Content-Type': 'text/plain' });
    res.end('{"message":"Your API works! ('+ res.statusCode +')"}')
});

// Response and Request
app.get('/app/flip/', (req, res) => {
    res.status(200).json({ 'flip': coinFlip() })
});

app.post('/app/flip/coins/', (req, res, next) => {
    const flips = coinFlips(req.body.number)
    const count = countFlips(flips)
    res.status(200).json({"raw":flips,"summary":count})
})

app.post('/app/flip/call/', (req, res, next) => {
    const game = flipACoin(req.body.guess)
    res.status(200).json(game)
})

// Debug endpoints
if (args.debug) {
    app.get('/app/log/access', (req, res) => {
        const stmt = db.prepare("SELECT * FROM accesslog").all();
        res.status(200).json(stmt);
    });
    app.get("/app/error", (req, res) => {
        throw new Error("Error Test Successful.");
    });
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


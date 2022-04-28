// Route (endpoint) definitions go in this directory

const express = require("express");

const flipFuncs = require("../utils/utilities.js");

const routesF = express.Router()

// single flip
routesF.route('/app/flip/').get(function (req, res, next) {
    const flip = flipFuncs.coinFlip()
    res.status(200).json({'flip': flip})

})

// multi flips
routesF.route('/app/flips/coins/').post(function (req, res, next) {
    try {
        const raw = flipFuncs.coinFlips(req.body.number)
        const summ = flipFuncs.countFlips(raw)

        res.status(200).json({'raw': raw, 'summ': summ})
    } catch {
        res.status(404).json({'raw': 'error', 'summ': 'error'})
    }
    
    
})

routesF.route('/app/flips/:number').get(function (req, res) {
    const flips = flipFuncs.coinFlips(req.params.number)
    const count = flipFuncs.countFlips(flips)
    res.status(200).json({ "raw": flips, "summary": count })
});

// guess flip
routesF.route('/app/flip/call/').post(function (req, res, next) {
    const flip = flipFuncs.flipACoin(req.body.guess)
    res.status(200).json(flip)
})

routesF.route('/app/flip/call/:guess(heads|tails)').get(function (req, res) {
    const game = flipFuncs.flipACoin(req.params.guess)
    res.status(200).json(game)
})

module.exports = routesF
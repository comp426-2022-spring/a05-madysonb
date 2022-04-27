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
    
    const raw = flipFuncs.coinFlips(req.body.number)
    const summ = flipFuncs.countFlips(raw)

    const rslt = {'raw': raw, 'summ': summ}
    document.getElementById("summaryHeads").innerHTML = rslt.summ.heads
    document.getElementById("summaryTails").innerHTML = rslt.summ.tails
    
    res.status(200).json({'raw': raw, 'summ': summ})
    
})

// guess flip
routesF.route('/app/flip/call/').post(function (req, res, next) {
    const flip = flipFuncs.flipACoin(req.body.guess)
    res.status(200).json(flip)
})


module.exports = routesF
// Route (endpoint) definitions go in this directory

const express = require("express");

flipFuncs = require(' path to coin functions')

const routes = express.Router()

// single flip
routes.route('/app/flip/').get(function (req, res, next) {
    const flip = flipFuncs.coinFlip()
    res.status(200).json({'flip': flip})

})
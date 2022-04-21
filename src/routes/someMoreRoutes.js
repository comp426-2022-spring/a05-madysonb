// debugging routes

const express = require("express");

const db = require('../services/database.js')

const routesD = express.Router()


routesD.route('/app/log/access').get(function (req, res, next) {
    try {
        const stmt = db.prepare("SELECT * FROM accesslog").all()
        res.status(200).json(stmt)
    } catch {
        console.error(res)
    }
    
});

routesD.route('/app/error/').get(function (req, res, next) {
    throw new Error("Error Test Successful.");
});

module.exports = routesD
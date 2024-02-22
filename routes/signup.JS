const express = require('express');
const session = require('express-session');

const Router = express.Router();

Router.get('', async (req, res) => {
    res.render("signup")
})

Router.post('', async (req, res) => {
    res.send(req.body)
})

module.exports = Router;
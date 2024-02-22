const express = require('express')
const session = require('express-session')

const Router = express.Router();


Router.get('', async (req, res) => {
    res.send("logging in.....")
})

Router.post('', async (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    }

    console.log(user);
    res.json(user);
})


module.exports = Router;
const express = require('express')
const session = require('express-session')

const Router = express.Router();

Router.use(session({
    secret: 'your-secret-key', // Change this to a random string
    resave: false,
    saveUninitialized: true
}))

Router.get('/', (req, res) => {
    console.log(req.session.message);
    // console.log(req.session ? res.session.message : "");
    res.render('reference')
})

Router.post('/', (req, res) => {
    req.session.message = "reference added message";
    res.redirect('/reference')
})

module.exports = Router;
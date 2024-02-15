const express = require('express')
const session = require('express-session')

const Router = express.Router();

//using session to pass data or object from directing route to the directed route
Router.use(session({
    secret: 'your-secret-key', // Change this to a random string
    resave: false,
    saveUninitialized: true
}));


Router.get('/', (req, res) => {
    console.log(req.session.message);
    res.render('languages');
})

Router.post('/', async (req, res) => {
    req.session.message = "me new message";
    res.redirect("/languages")
})

module.exports = Router;
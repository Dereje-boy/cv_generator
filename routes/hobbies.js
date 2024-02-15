const express = require('express')
const session = require('express-session')

const Router = express.Router();

Router.use(session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true
}))

Router.get('/', (req, res) => {
    console.log(req.session.message);
    res.render('hobbies');
})

Router.post('/', (req, res) => {
    req.session.message = 'hobbies added successfully';
    res.redirect('/hobbies');
})

module.exports = Router;
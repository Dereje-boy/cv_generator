const express = require('express')
const session = require('express-session');
const Router = express.Router();

Router.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true
}));

Router.get('', (req, res) => {
    const theUserEmail = req.session.theUser != null ? req.session.theUser.email : res.theUser;
    console.log('the user email :', theUserEmail);
    res.render('dashboard', {
        email: res.theUser.email,
    })
})

Router.post('/', (req, res) => {
    res.render('dashboard')
})

module.exports = Router;
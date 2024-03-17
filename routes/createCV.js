const express = require('express')
const Router = express.Router();

const designCV = require('../Designer/Design1/designCV.js');

Router.get('/', (req, res) => {

    //initiate the design from here
    designCV(res.theUser);

    res.render('createCV', {
        title: 'createCV',
        email: res.theUser.email
    })
})

module.exports = Router;
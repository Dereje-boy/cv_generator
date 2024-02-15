const express = require('express')
const Router = express.Router();

Router.get('', (req, res) => {
    res.render('education');
})

Router.post('', (req, res) => {
    res.redirect('/education');

    const { universityName, documentTitle, graduationYear, cgpa } = req.body;
    console.log({ universityName, documentTitle, graduationYear, cgpa });

})

module.exports = Router;
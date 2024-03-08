const express = require('express')
const Router = express.Router();

//education schema
const schema = require('../models/education');

Router.get('/', (req, res) => {
    res.render('education', { title: "CV Gen.. | Education", message });
    console.log('message', message);
    message = undefined;
})

let message;

Router.post('/', (req, res) => {

    const { universityName, documentTitle, graduationYear, cgpa } = req.body;
    //console.log({ universityName, documentTitle, graduationYear, cgpa });

    thisEducation = new schema({
        nameOfUniversity: universityName,
        titleOfDocument: documentTitle,
        CGPA: cgpa,
        yearOfGraduation: graduationYear,
        user_id: res.theUser._id
    });

    thisEducation.save().then(insertResult => {
        //console.log('insert Result: \n', insertResult);
        // passing message through message variable defined above
        message = 'The Education inserted successfully';

    }).catch(e => {
        // passing message through session module
        message = `The Education is not inserted \n ${e}`;
        console.log(e.message);

    })
    res.redirect('/education')

})

module.exports = Router;
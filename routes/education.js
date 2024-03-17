const express = require('express')
const Router = express.Router();
const mongoose = require('mongoose')
const mongodb = require('mongodb')

//education schema
const schema = require('../models/education');

Router.get('/', async (req, res) => {

    try {
        const thisUserEducations = await schema.find({ user_id: res.theUser._id });

        const thisEdu = [];
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        thisUserEducations.forEach((edu, index) => {

            d = new Date(edu.yearOfGraduation);

            thisEdu[index] = {
                "_id": edu._id,
                "nameOfUniversity": edu.nameOfUniversity,
                "titleOfDocument": edu.titleOfDocument,
                "CGPA": edu.CGPA,
                "yearOfGraduation": `${months[d.getMonth()]} - ${d.getFullYear()}`,
            }
        });

        //console.log('this edu', thisEdu.length)

        res.render('education', {
            title: "CV Gen.. | Education",
            message: req.session.message, thisEdu,
            email: res.theUser.email
        });
    } catch (error) {
        console.log(error)
        res.render('education', {
            title: "CV Gen.. | Education",
            message: req.session.message,
            email: res.theUser.email
        });
    } finally {
        delete req.session.message
    }

})

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
        req.session.message = 'The Education inserted successfully';
        res.redirect('/education')
    }).catch(e => {
        // passing message through session module
        req.session.message = `The Education is not inserted \n ${e}`;
        console.log(e.message);
        res.redirect('/education')
    })

})


Router.delete('/', async (req, res) => {
    try {
        const deleted = await schema.deleteOne({ _id: new mongoose.Types.ObjectId(req.body._id) })
        //console.log(deleted)
        if (deleted.deletedCount == 1)
            res.send({ success: true, reason: null })
        else
            res.send({ success: false, reason: 'unable to delete, please re check and then try again later.' })
    } catch (error) {
        console.log(error)
        res.send({ success: false, reason: error })
    }
})

module.exports = Router;
const express = require('express');
const mongoose = require('mongoose');

//experience schema
const schema = require('../models/experience');

const router = express.Router();

router.get('', async (req, res) => {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    try {
        const thisUserExp = await schema.find({
            user_id: res.theUser._id
        });
        //console.log(thisUserExp)
        const thisExp = [];
        thisUserExp.forEach((exp, index) => {
            startDate = new Date(exp.startDate)
            endDate = exp.endDate ? new Date(exp.endDate) : null

            thisExp[index] = {
                _id: exp._id,
                position: exp.position,
                companyName: exp.companyName,
                aboutExperience: exp.aboutExperience,
                startDate: `${months[startDate.getMonth()]} - ${startDate.getFullYear()}`,
                endDate: endDate ? `${months[endDate.getMonth()]} - ${endDate.getFullYear()}` : '',

            }
        });
        res.render("experience", {
            title: "CV Gen.. | Experience",
            message: req.session.message, thisExp,
            email: res.theUser.email
        });
    } catch (error) {
        res.render("experience", {
            title: "CV Gen.. | Experience",
            message: req.session.message,
            email: res.theUser.email
        });
        console.log(error)
    } finally {
        delete req.session.message;
    }
})

router.post('', async (req, res) => {

    console.log(req.body)

    const { position, startDate, stillHere, companyName, aboutExperience } = req.body;

    let { endDate } = req.body;

    //typeof stillHere is either string with 'on' or undefined type
    if (typeof stillHere == typeof "" && stillHere.length>1) endDate = '';


    let thisExperience = new schema({
        position: position,
        companyName: companyName,
        aboutExperience: aboutExperience,
        startDate: startDate,
        endDate: endDate,
        user_id: res.theUser._id

    })

    thisExperience.save().then(insertResult => {
        //console.log('insert Result: \n', insertResult);
        // passing message through message variable defined above
        req.session.message = 'Experience Added Successfully';

    }).catch(e => {
        // passing message through session module
        req.session.message = `Adding Experience Unsuccessfull, Please try Again. \n ${e}`;
        console.log(e.message);
    }).finally(() => {
        res.redirect('/experience')
    })
})

router.delete('', async (req, res) => {
    const id = req.body.id;
    console.log(id);

    try {
        const deleted = await schema.deleteOne({ _id: new mongoose.Types.ObjectId(id) })
        console.log(deleted)
        if (deleted && deleted.deletedCount == 1)
            return res.send({
                success: true,
                reason: null
            })
        else
            return res.send({
                success: false,
                reason: 'The experience is not deleted, Please try again'
            })

    } catch (error) {
        console.log(error)
        return res.send({
            success: false,
            reason: error
        })
    }
})

module.exports = router;
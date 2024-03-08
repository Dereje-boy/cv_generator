const express = require('express');

//experience schema
const schema = require('../models/experience');

const router = express.Router();

let message;

router.get('', (req, res) => {
    console.log('message', message);
    res.render("experience", { title: "CV Gen.. | Experience", message });
    message = undefined;
})

router.post('', async (req, res) => {

    console.log(req.body)

    const { position, startDate, stillHere, companyName, aboutExperience } = req.body;

    let { endDate } = req.body;

    //typeof stillHere is either string with 'on' or undefined type
    if (typeof stillHere == typeof "") endDate = undefined;


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
        message = 'Experience Added Successfully';

    }).catch(e => {
        // passing message through session module
        message = `Adding Experience Unsuccessfull, Please try Again. \n ${e}`;
        console.log(e.message);
    }).finally(() => {
        res.redirect('/experience')
    })
})

module.exports = router;
const express = require('express');
const router = express.Router();

const createCV = require('../createCV');

//user defined modules
const schema = require('../models/personalInformation');

router.get("/", (req, res) => {
    res.render("basicInformation",
        {
            title: 'CV Gen... | Basic Information',
            message: req.session.message
        });
    delete req.session.message
})

router.post("/", async (req, res) => {

    firstname = req.body.firstname;
    lastname = req.body.lastname;
    phoneNumber = req.body.phoneNumber;
    email = req.body.email;
    city = req.body.city;
    state = req.body.state;
    aboutMe = req.body.aboutMe;

    //all information to store
    // console.log(req.body);

    //updating the cv with this provided name
    //createCV.createCV(firstname + " " + lastname);

    //you can get the logged in user email and _id
    //console.log('who is this:', res.theUser)

    //inserting the user info by using defined pi schema
    // pi = Personal Information

    const thisInfo = new schema({
        firstname, lastname, phoneNumber, email, city, state, aboutMe, user_id: res.theUser._id
    });

    thisInfo.save().then(insertResult => {
        //console.log('insert Result: \n', insertResult);
        // passing message through message variable defined above
        req.session.message = 'The Information inserted successfully';
        console.log(req.session.message);
        res.redirect('/basicInformation')
    }).catch(e => {
        // passing message through session module
        req.session.message = `The information is not inserted \n ${e}`;
        console.log(req.session.message);
        res.redirect('/basicInformation')
    })
})

module.exports = router;
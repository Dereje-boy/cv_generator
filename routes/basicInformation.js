const express = require('express');
const router = express.Router();
const session = require('express-session')

//user defined modules
const createCV = require('../createCV');
const userModel = require('../models/user');
const mongoModel = require('../models/mongoClient');

router.use(session({
    saveUninitialized: true,
    secret: 'your-secret-key',
    resave: false
}))

router.get("/", (req, res) => {
    res.render("basicInformation",
        {
            title: 'CV Generator | Basic Information',
            message: req.session.message
        });
})

router.post("/", async (req, res) => {

    const usersCollection = mongoModel.getClientConnection('users')

    firstname = req.body.firstname;
    lastname = req.body.lastname;
    phoneNumber = req.body.phoneNumber;
    email = req.body.email;
    city = req.body.city;
    state = req.body.state;
    aboutMe = req.body.aboutMe;

    console.log(req.body);
    const thisUser = new userModel.user(firstname, lastname, phoneNumber, email, city, state, aboutMe);
    console.log();

    //updating the cv with this provided name
    createCV.createCV(firstname + " " + lastname);


    //inserting to mongo    
    const { acknowledged } = await mongoModel.insertOneUser(thisUser)
    console.log(acknowledged);

    if (acknowledged) message = `"${firstname} ${lastname}" saved successfully.`;
    else
        message = `"${firstname} ${lastname}" Not saved successfully.`;

    // passing message through session module
    req.session.message = message;

    res.redirect('/basicInformation')
})

function failFirstname(firstname) {
    if (firstname.length < 3)
        return "The firstname shouldnot be lessthan three characters.";
    else return false;
}

function failLastname(lastname) {
    if (lastname.length < 3)
        return "The lastname shouldnot be lessthan three characters.";
    else return false;
}

function failPhoneNumber(phoneNumber) {
    if (phoneNumber.length < 9 || phoneNumber.length > 14)
        return "The phone number should be nine to fourteen characters";
    else return false;
}

module.exports = router;
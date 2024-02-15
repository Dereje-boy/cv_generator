const express = require('express');
const router = express.Router();
const createCV = require('../createCV');

let message = ""
var firstname, lastname, phoneNumber, email, aboutMe;

router.get("/", (req, res) => {
    res.render("basicInformation", { title: 'CV Generator | Basic Information', message, firstname, lastname, phoneNumber, email, aboutMe });
})

router.post("/", (req, res) => {

    firstname = req.body.firstname;
    lastname = req.body.lastname;
    phoneNumber = req.body.phoneNumber;
    email = req.body.email;
    aboutMe = req.body.aboutMe;

    // console.log({ firstname, lastname, phoneNumber, email, aboutMe });
    console.log(req.body);

    message = failFirstname(firstname)
    message = message + failLastname(lastname);
    message = message + failPhoneNumber(phoneNumber);


    createCV.createCV(firstname + " " + lastname);

    res.redirect('/experience')
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
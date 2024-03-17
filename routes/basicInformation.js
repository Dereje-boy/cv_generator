const express = require('express');
const router = express.Router();

const createCV = require('../createCV');

//user defined modules
const schema = require('../models/personalInformation');

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null, 'pp_images/')
    },
    fileName: function (req, file, cb) {
        console.log("the file name is ",file.originalname.toString()+'.png')
        cb(null, file.originalname.toString()+'.png')
    }
});

const upload = multer({storage:multer.diskStorage({
        destination: function (req,file,cb) {
            cb(null, '/pp_images/')
        },
        fileName: function (req, file, cb) {
            console.log(file)
            console.log("the file name is ",file.originalname.toString()+'.png')
            cb(file.originalname, file.originalname.toString()+'.png')
            }
        })
    })

router.get("/", async (req, res) => {
    let email;

    try {
        const PI = await schema.find({ email: res.theUser.email })
        //console.log({ user_id: res.theUser._id }, 'PI', PI)

        //get the email from the existing user account used when creating account
        email = res.theUser.email

        const pi = {
            _id: PI[0]?._id,
            aboutMe: PI[0]?.aboutMe,
            city: PI[0]?.city,
            email,
            firstname: PI[0]?.firstname,
            lastname: PI[0]?.lastname,
            phoneNumber: PI[0]?.phoneNumber,
            state: PI[0]?.state,
            alreadyExist: PI[0] ? true : false
        }
        // console.log('pi', pi)

        res.render("basicInformation",
            {
                title: 'CV Gen... | Basic Information',
                email: res.theUser.email,
                message: req.session.message,
                pi,
            });

    } catch (error) {
        console.log(error)
        res.render("basicInformation",
            {
                title: 'CV Gen... | Basic Information',
                message: req.session.message,
            });

    } finally {
        delete req.session.message

    }

})

router.post("/", upload.single('image'), async (req, res) => {

    // console.log('the file', req.image)
    console.log('Receiving the file...');

    firstname = req.body.firstname;
    lastname = req.body.lastname;
    phoneNumber = req.body.phoneNumber;

    //get the email from the existing user account used when creating account
    let email = res.theUser.email

    city = req.body.city;
    state = req.body.state;
    aboutMe = req.body.aboutMe;

    //to make personal information free from redundancy we use upsert: if it exist before, we only update, but if it doesn't exist we insert boom 😍

    //, user_id: res.theUser._id
    schema.updateOne({ user_id: res.theUser._id }, {
        firstname, lastname, phoneNumber, email, city, state, aboutMe
    }, { upsert: true }).then(upsertResult => {
        //console.log('insert Result: \n', insertResult);
        // passing message through message variable defined above
        req.session.message = upsertResult.modifiedCount | upsertResult.matchedCount > 0 ? 'The Information updated successfully' : 'The Information inserted successfully';
        // console.log('insert Result', upsertResult)
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
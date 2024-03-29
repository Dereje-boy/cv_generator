const express = require('express');
const router = express.Router();

//user defined modules
const schema = require('../models/personalInformation');
const mongoose = require('mongoose')

const multer = require("multer");

const myStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/pp_images/')
    },
    filename: function (req, file, cb) {
        let email = thisRes?.theUser.email
        console.log(file)
        cb(null, nameImageFile(file,email) )
    }
})

let thisRes;

const upload = multer({storage:myStorage});
router.get("/", async (req, res) => {
    thisRes = res;
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
            alreadyExist: PI[0] ? true : false,
            pp_image_path:PI[0]?.pp_image_path
        }
        console.log('pi', pi)

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

let pp_image_path;

router.post("/", upload.single('image'), async (req, res) => {

    console.log("The basic information ", req.body);

    firstname = req.body.firstname;
    lastname = req.body.lastname;
    phoneNumber = req.body.phoneNumber;

    //get the email from the existing user account used when creating account
    let email = res.theUser.email

    city = req.body.city;
    state = req.body.state;
    aboutMe = req.body.aboutMe;

    const filter = {user_id: new mongoose.Types.ObjectId(res.theUser._id) }

    //to make personal information free from redundancy we use upsert: if it exist before, we only update, but if it doesn't exist we insert boom 😍

    //, user_id: res.theUser._id

    //find one
    const theExistingData = await schema.find(filter);
    console.log("The existing Data", theExistingData);
    if(theExistingData)
        schema.updateOne(filter, {
            firstname,
            lastname,
            phoneNumber,
            city,
            state,
            aboutMe,
            pp_image_path:'/pp_images/'+pp_image_path
        }).then(updateResult=>{
            console.log("The Info upadate successfully", updateResult);
            req.session.message = 'The Information updated successfully';
            return res.redirect('/basicInformation')
        }).catch(UnabletoUpdate=>{
            console.log('Unable to Update, ', UnabletoUpdate)
            req.session.message = `Unable to Update, \n ${e}`;
            return res.redirect('/basicInformation')
        })
    else{
        const thisSchema = new schema({
            firstname, lastname, phoneNumber, city, state, aboutMe,pp_image_path:'/pp_images/'+pp_image_path
        });
        thisSchema.save().then(insertData=>{
            console.log("The data inserted successfully, ", insertData);
            req.session.message = 'The Information inserted successfully';
            return res.redirect('/basicInformation')
        }).catch(e=>{
            console.log("The data isnot inserted, ", e);
            req.session.message = `The information is not inserted \n ${e}`;
            return res.redirect('/basicInformation')
        })
    }

    /* The old code, it was updated because it was not able to update

    schema.findOneAndUpdate({ user_id: res.theUser._id }, {
        firstname, lastname, phoneNumber, city, state, aboutMe,pp_image_path:'/pp_images/'+pp_image_path
    }, { upsert: true, new:true }).then(upsertResult => {
        console.log('insert Result: \n', upsertResult);
        // passing message through message variable defined above
        req.session.message = upsertResult.modifiedCount | upsertResult.matchedCount > 0 ? 'The Information updated successfully' : 'The Information inserted successfully';
        // console.log('insert Result', upsertResult)
        // console.log(req.session.message);
        res.redirect('/basicInformation')
    }).catch(e => {
        req.session.message = `The information is not inserted \n ${e}`;
        // console.log(req.session.message);
        // passing message through session module
        res.redirect('/basicInformation')
    })
     */

})

function nameImageFile(file,email) {
    console.log('original file name', file.originalname)
    const fileExtension = file.originalname?.slice(file.originalname.lastIndexOf('.'), file.originalname.length)
    pp_image_path = email+ fileExtension
    return pp_image_path;

}

module.exports = router;
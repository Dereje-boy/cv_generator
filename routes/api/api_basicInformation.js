const express = require('express');
const router = express.Router();

//verify cookie
const cookieVerifier = require('./api_verifier');

//user defined modules
const schema = require('../../models/personalInformation');
const user = require('../../models/user');

const result = {
    operation: '',
    success: false,
    reason: undefined,
    solution: '',
};

//creating new pi data
router.post('/new', async (req, res) => {
    const cookie = req.body.cookie;
    console.log(req.body);

    const cookieVerifyResult = cookieVerifier(cookie);

    console.log(cookieVerifyResult);

    //if cookie is failed to verify
    if (cookieVerifyResult.cookieVerified == false)
        return res.send({
            operation: 'new-post',
            success: false,
            reason: cookieVerifyResult.reason,
            solution: cookieVerifyResult.solution
        });


    //if cookie is valid and contain valid user with email and password in db
    // we want to have the user's objectID, to insert with pi
    const theUser = await user.findOne({email: cookieVerifyResult.theUser.email});

    //if the user{email, password} is not found
    if (theUser == null)
        return res.send({
            operation: 'new-post',
            success: false,
            reason: 'Account doesn\'t exist',
            solution: 'Please, create new account or login'
        });

    const thisPi = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phoneNumber: req.body.phoneNumber,
        email: cookieVerifyResult.theUser.email,
        city: req.body.city,
        state: req.body.state,
        aboutMe: req.body.aboutMe,
        pp_image_path: req.body.pp_image_path,
        user_id: theUser._id
    }

    const createResult = await createNewPi(thisPi);

    res.send(createResult)
});

//getting existing PI data by 'user_id' 
router.get('/one', async (req, res) => {
    const cookie = req.query['cookie'];

    const cookieVerifyResult = cookieVerifier(cookie);

    // console.log(cookieVerifyResult);

    //if cookie is failed to verify
    if (cookieVerifyResult.cookieVerified == false)
        return res.send({
            operation: 'one-pi-get',
            success: false,
            reason: cookieVerifyResult.reason,
            solution: cookieVerifyResult.solution
        });


    //if cookie is valid and contain valid user with email and password in db
    // we want to have the user's objectID, to insert with pi
    try{
        const theUser = await user.findOne({email: cookieVerifyResult.theUser.email});
        //if the user{email, password} is not found
        if (theUser == null)
            return res.send({
                operation: 'one-pi-get',
                success: false,
                reason: 'Account doesn\'t exist',
                solution: 'Please, create new account or login'
            });

        try {
            const thisPi = await schema.findOne({email: cookieVerifyResult.theUser.email});

            console.log(thisPi)

            //if everything is fine
            return res.send({
                operation: 'one-pi-get',
                success: true,
                reason: null,
                solution: thisPi
            })
        }catch (error) {
            console.log(error)

            //if everything is fine
           return res.send({
                operation: 'one-pi-get',
                success: false,
                reason: 'Unable to get the information',
                solution: 'Retry, or contact the developer'
            })
        }

    }catch (error) {
        //if the user{email, password} is not found
        if (theUser == null)
            return res.send({
                operation: 'one-pi-get',
                success: false,
                reason: e,
                solution: 'Unable to check user existance'
            });
    }
});

module.exports = router;

async function createNewPi(pi) {
    let result = {
        operation: '',
        success: false,
        reason: undefined,
        solution: '',
    };


    const thisPI = new schema({
        firstname: pi.firstname,
        lastname: pi.lastname,
        phoneNumber: pi.phoneNumber,
        email: pi.email,
        city: pi.city,
        state: pi.state,
        aboutMe: pi.aboutMe,
        pp_image_path: pi.pp_image_path,
        user_id: pi.user_id
    });

    try {
        const saved = await thisPI.save();
        // console.log(saved);
        result = {
            operation: 'insert',
            success: true,
            reason: null,
            solution: 'Information inserted successfully',
        };

    } catch (e) {
        if (e.code === 11000)
            //email duplicated, this mean the pi already insert
            //now we have to update it
            result = updatePi(thisPI);
        else {
            console.log(e);
            result = {
                operation: 'insert',
                success: false,
                reason: "Please re-check the information you have submitted",
                solution: 'Unable to insert the information, retry with all fields are filled out.',
            };
        }
    }

    return result;
}

async function updatePi(pi) {
    let result = {
        operation: '',
        success: false,
        reason: undefined,
        solution: '',
    };

    const email = pi['email'];

    const thisPi = {
        firstname: pi.firstname,
        lastname: pi.lastname,
        phoneNumber: pi.phoneNumber,
        city: pi.city,
        state: pi.state,
        aboutMe: pi.aboutMe,
        pp_image_path: pi.pp_image_path,
    }
    try {

        const updated = await schema.updateOne({email}, thisPi);
        result = {
            operation: 'Update PI',
            success: true,
            reason: null,
            solution: 'The information updated successfully',
        }
        console.log(updated);
        return result;
    } catch (error) {
        result = {
            operation: 'Update PI',
            success: false,
            reason: "Please re-check the information you have submitted",
            solution: 'Unable to update the information, retry with all fields are filled out.',
        }
        console.log(error.message);
        return result;
    }
}
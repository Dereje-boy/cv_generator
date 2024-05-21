const express = require('express');
const router = express.Router();

//verify cookie
const cookieVerifier = require('./api_verifier');

//user defined modules
const hobby = require('../../models/hobbies');
const user = require('../../models/user');
const mongoose = require('mongoose');
const schema = require("../../models/hobbies");

router.post('/new', async(req,res)=>{
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
    // we want to have the user's objectID, to insert with hobby
    const theUser = await user.findOne({email: cookieVerifyResult.theUser.email});

    //if the user {email, password} is not found
    if (theUser == null)
        return res.send({
            operation: 'new-post',
            success: false,
            reason: 'Account doesn\'t exist',
            solution: 'Please, create new account or login'
        })
    const thisHobby = {
        hobby: req.body.hobby,
        user_id: theUser._id
    }
    const createResult = await createNewHobby(thisHobby);

    res.send(createResult)

})

router.get('/one',async (req,res)=>{
    const cookie = req.query['cookie'];
    const cookieVerifyResult = cookieVerifier(cookie);

    console.log(cookieVerifyResult);

    //if cookie is failed to verify
    if (cookieVerifyResult.cookieVerified == false)
        return res.send({
            operation: 'one-pi-get',
            success: false,
            reason: cookieVerifyResult.reason,
            solution: cookieVerifyResult.solution
        });

    try{
        const theUser = await user.findOne({email:cookieVerifyResult.theUser.email});

        //if the user is not found
        if (theUser == null)
            return res.send({
                operation: 'one-edu-get',
                success: false,
                reason: 'Account doesn\'t exist',
                solution: 'Please, create new account or login'
            });
        try{
            const myHobbies = await hobby.findOne({user_id:theUser._id});
            console.log("This user hobbies");
            console.log(myHobbies);

            //if everything is fine
            return res.send({
                operation: 'one-hob-get',
                success: true,
                reason: null,
                solution: myHobbies
            })
        }catch (e) {
            console.log(e)

            //if unable to get edu data
            return res.send({
                operation: 'one-hob-get',
                success: false,
                reason: 'Unable to get the information',
                solution: 'Retry, or contact the developer'
            })
        }

    }catch (e) {
        return res.send({
            operation: 'one-hob-get',
            success: false,
            reason: 'Account doesn\'t exist',
            solution: 'Please, create new account or login'
        });
    }

})

module.exports = router;

async function createNewHobby(thisHobby) {
    try{
        const updated = await hobby.updateOne( { user_id: thisHobby.user_id }, { $push:  { hobby:  { $each: thisHobby.hobby.split(',').map(hobby => hobby.trim().toUpperCase()) } } },  { upsert: true } );

        console.log(updated);
        result = {
            operation: 'insert',
            success: true,
            reason: null,
            solution: 'Hobby inserted successfully',
        }
    }catch (e) {
        console.log(e);
        result = {
            operation: 'insert',
            success: false,
            reason: "Please re-check the information you have submitted",
            solution: 'Unable to insert the information, retry with all fields are filled out.',
        };
    }
    return result;
}

const express = require('express');
const router = express.Router();

//verify cookie
const cookieVerifier = require('./api_verifier');

//user defined modules
const experience = require('../../models/experience');
const user = require('../../models/user');
const mongoose = require('mongoose');
const education = require("../../models/education");
const result = {
    operation: '',
    success: false,
    reason: undefined,
    solution: '',
};
router.post('/new', async (req,res)=>{})

router.get('/one', async (req,res)=>{
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
                operation: 'one-exp-get',
                success: false,
                reason: 'Account doesn\'t exist',
                solution: 'Please, create new account or login'
            });

        try{
            const myExpriences = await experience.find({user_id: new mongoose.Types.ObjectId(theUser._id)});

            console.log('This user exp')
            console.log(myExpriences)

            //if everything is fine
            return res.send({
                operation: 'one-pi-get',
                success: true,
                reason: null,
                solution: myExpriences
            })

        }catch (error) {
            console.log(error)

            //if unable to get exp data
            return res.send({
                operation: 'one-exp-get',
                success: false,
                reason: 'Unable to get the information',
                solution: 'Retry, or contact the developer'
            })

        }

    }catch (e) {
        return res.send({
            operation: 'one-exp-get',
            success: false,
            reason: 'Account doesn\'t exist',
            solution: 'Please, create new account or login'
        });
    }


})

router.delete('/delete', async (req,res)=>{

})

module.exports = router;

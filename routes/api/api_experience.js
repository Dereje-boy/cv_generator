const express = require('express');
const router = express.Router();

//verify cookie
const cookieVerifier = require('./api_verifier');

//user defined modules
const experience = require('../../models/experience');
const user = require('../../models/user');
const mongoose = require('mongoose');
const result = {
    operation: '',
    success: false,
    reason: undefined,
    solution: '',
};

router.post('/new', async (req,res)=>{
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

    let endDate = req.body.endDate;

    //typeof stillHere is either string with 'on' or undefined type
    if (typeof stillHere == typeof "" && stillHere.length>1) endDate = '';

    const thisExp = {
        position: req.body.position,
        companyName: req.body.companyName,
        aboutExperience: req.body.aboutExperience,
        startDate: req.body.startDate,
        endDate: endDate,
        user_id: theUser._id
    }

    const createResult = await createNewExp(thisExp);

    res.send(createResult)
})

async function createNewExp(thisExp) {

    let result = {
        operation: '',
        success: false,
        reason: undefined,
        solution: '',
    };

    const schemaExp = new experience({
        position: thisExp.position,
        aboutExperience: thisExp.aboutExperience,
        companyName: thisExp.companyName,
        startDate: thisExp.startDate,
        endDate:thisExp.endDate,
        user_id: thisExp.user_id
    });

    try{
        const saved = await schemaExp.save();
        console.log(saved);
        result = {
            operation: 'insert Exp',
            success: true,
            reason: null,
            solution: 'Experience inserted successfully',
        };
    }catch (e) {
        console.log(e);
        result = {
            operation: 'insert Exp',
            success: false,
            reason: "Please re-check the information you have submitted",
            solution: 'Unable to insert the information, retry with all fields are filled out.',
        };
    }
    return result;
}

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
    const cookie = req.query['cookie'];
    const _id = req.query['_id'];

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

    try {
        const myExperience = await experience.deleteOne(
            {_id: new mongoose.Types.ObjectId(_id)});

        console.log('This experience delete result')
        console.log(myExperience)

        //if everything is fine
        return res.send({
            operation: 'one-pi-get',
            success: true,
            reason: null,
            solution: myExperience
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

})

module.exports = router;

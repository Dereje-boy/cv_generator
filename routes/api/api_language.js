const express = require('express');
const router = express.Router();

//verify cookie
const cookieVerifier = require('./api_verifier');

//user defined modules
const language = require('../../models/language');
const user = require('../../models/user');
const mongoose = require('mongoose');
const education = require("../../models/education");
// const result = {
//     operation: '',
//     success: false,
//     reason: undefined,
//     solution: '',
// };

router.post('/new', async(req,res)=>{
    const cookie = req.body.cookie;
    console.log(req.body);

    const cookieVerifyResult = cookieVerifier(cookie);

    console.log(cookieVerifyResult);

    //if cookie is failed to verify
    if (cookieVerifyResult.cookieVerified == false)
        return res.send({
            operation: 'new-post-lang',
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

    const thisLang = {
        langauge: req.body.language,
        level: req.body.level,
        user_id: theUser._id
    }
    const createResult = await createNewLang(thisLang);

    res.send(createResult)

})


router.get('/one', async (req,res)=>{

    const cookie = req.query['cookie'];

    const cookieVerifyResult = cookieVerifier(cookie);

    // console.log(cookieVerifyResult);

    //if cookie is failed to verify
    if (cookieVerifyResult.cookieVerified == false)
        return res.send({
            operation: 'one-lang-get',
            success: false,
            reason: cookieVerifyResult.reason,
            solution: cookieVerifyResult.solution
        });


    //if cookie is valid and contain valid user with email and password in db
    // we want to have the user's objectID, to insert with pi
    try {
        const theUser = await user.findOne({email: cookieVerifyResult.theUser.email});
        //if the user{email, password} is not found
        if (theUser == null)
            return res.send({
                operation: 'one-lang-get',
                success: false,
                reason: 'Account doesn\'t exist',
                solution: 'Please, create new account or login'
            });
        try {
            const myLanguages = await language.find({user_id: theUser._id});

            console.log('This user languages')
            console.log(myLanguages)

            //if everything is fine
            return res.send({
                operation: 'one-lang-get',
                success: true,
                reason: null,
                solution: myLanguages
            })
        }catch (error) {
            console.log(error)

            //if unable to get lang data
            return res.send({
                operation: 'one-lang-get',
                success: false,
                reason: 'Unable to get the information',
                solution: 'Retry, or contact the developer'
            })
        }
    }catch (e) {
        return res.send({
            operation: 'one-lang-get',
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
            operation: 'one-lang-get',
            success: false,
            reason: cookieVerifyResult.reason,
            solution: cookieVerifyResult.solution
        });

    try{
        const myLanguage = await language.deleteOne({
            _id: new mongoose.Types.ObjectId(_id)
        });

        console.log('This language delete result')
        console.log(myLanguage)

        //if everything is fine
        return res.send({
            operation: 'one-educ-get',
            success: true,
            reason: null,
            solution: myLanguage
        })

    }catch (e) {
        console.log(error)

        //if everything is fine
        return res.send({
            operation: 'one-lang-get',
            success: false,
            reason: 'Unable to get the information',
            solution: 'Retry, or contact the developer'
        })
    }

})

async function createNewLang(thisLang) {
    let result = {
        operation: '',
        success: false,
        reason: undefined,
        solution: '',
    };

    const levelEnum = ['Native', 'Fluent', 'Advanced', 'Beginner'];
    let level2Add ;
    levelEnum.forEach((value)=>{
        if (value.toLowerCase() === thisLang.level.toLowerCase()) level2Add = value;
    });

    const schema = new language({
        language:thisLang.langauge,
        level: level2Add,
        user_id:new mongoose.Types.ObjectId(thisLang.user_id)
    })

    if (level2Add.length>1)
    try{
        const saved = await schema.save();
        console.log(saved);
        result = {
            operation: 'insert',
            success: true,
            reason: null,
            solution: 'Language inserted successfully',
        };
    }catch (e) {
        console.log(e);
        result = {
            operation: 'insert',
            success: false,
            reason: "Please re-check the information you have submitted",
            solution: 'Unable to insert the information, retry with all fields are filled out.',
        };
    }
    else{
        console.log("Level is not one of the predefined values/enums");
        result = {
            operation: 'insert',
            success: false,
            reason: "Please re-check the information you have submitted",
            solution: 'Unable to insert the information, retry with all fields are filled out.',
        };
    }
    return result;
}


module.exports = router;
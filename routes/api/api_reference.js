const express = require('express');
const router = express.Router();

//verify cookie
const cookieVerifier = require('./api_verifier');

//user defined modules
const reference = require('../../models/reference');
const user = require('../../models/user');
const mongoose = require('mongoose');
// const result = {
//     operation: '',
//     success: false,
//     reason: undefined,
//     solution: '',
// };


router.post('/new', async (req,res) => {
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
    // we want to have the user's objectID, to insert with reference
    const theUser = await user.findOne({email: cookieVerifyResult.theUser.email});


    //if the user{email, password} is not found
    if (theUser == null)
        return res.send({
            operation: 'new-post',
            success: false,
            reason: 'Account doesn\'t exist',
            solution: 'Please, create new account or login'
        });

    const thisRef = {
        fullname: req.body.fullname,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        role: req.body.role,
        user_id: theUser._id
    }

    const createResult = await createNewRef(thisRef);

    res.send(createResult)
});

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
    try {
        const theUser = await user.findOne({email: cookieVerifyResult.theUser.email});
        //if the user{email, password} is not found
        if (theUser == null)
            return res.send({
                operation: 'one-edu-get',
                success: false,
                reason: 'Account doesn\'t exist',
                solution: 'Please, create new account or login'
            });
        try {
                const myReferences = await reference.find({
                    user_id: theUser._id
                });
            console.log("This user references");
            console.log(myReferences);

            //if everything is fine
            return res.send({
                operation: 'one-ref-get',
                success: true,
                reason: null,
                solution: myReferences
            })
        }catch (error) {
            console.log(error)

            //if unable to get edu data
            return res.send({
                operation: 'one-edu-get',
                success: false,
                reason: 'Unable to get the information',
                solution: 'Retry, or contact the developer'
            })
        }
    }catch (e) {
        return res.send({
            operation: 'one-ref-get',
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
            operation: 'one-edu-get',
            success: false,
            reason: cookieVerifyResult.reason,
            solution: cookieVerifyResult.solution
        });

    try{
        const deletedRef = await reference.deleteOne({_id:new mongoose.Types.ObjectId(_id)});
        console.log("Deleted ref");
        console.log(deletedRef);

        //if everything is fine
        return res.send({
            operation: 'one-educ-get',
            success: true,
            reason: null,
            solution: deletedRef
        })

    }catch (e) {
        console.log(error);

        //if everything is fine
        return res.send({
            operation: 'one-educ-get',
            success: false,
            reason: 'Unable to get the information',
            solution: 'Retry, or contact the developer'
        })
    }

})

module.exports = router;

async function createNewRef(thisRef){
    let result = {
        operation: '',
        success: false,
        reason: undefined,
        solution: '',
    };

    const ref = new reference({
        fullname: thisRef.fullname,
        phoneNumber: thisRef.phoneNumber,
        email: thisRef.email,
        role: thisRef.role,
        user_id: thisRef.user_id,
    });

    try{
        const saved = await ref.save();
        console.log(saved);
        result = {
            operation: 'insert',
            success: true,
            reason: null,
            solution: 'Reference inserted successfully',
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
const express = require('express')

//hobbies schema
const schema = require('../models/hobbies');

const Router = express.Router();

Router.get('/', async (req, res) => {
    console.log('session message ', req.session.message);
    try {
        const hobbies = await schema.find({ user_id: res.theUser._id });
        thisUsersHobbies = hobbies[0]?.hobby;
        // console.log('this user hobbies', thisUsersHobbies)
        res.render('hobbies',
            {
                message: req.session.message,
                thisUsersHobbies,
                email: res.theUser.email
            });

    } catch (error) {
        console.log(error)
        res.render('hobbies',
            {
                message: "unable to load your list of hobbies",
                email: res.theUser.email
            });
    } finally {
        delete req.session.message
    }
})

Router.post('/', (req, res) => {
    const hobbies = req.body.hobbies;

    //hobbies are given to us, process it
    if (hobbies.length > 0) {
        schema.updateOne(
            {
                user_id: res.theUser._id
            }, {
            $push:
            {
                hobby:
                    { $each: hobbies.split(',').map(hobby => hobby.trim().toUpperCase()) }
            }
        },
            {
                upsert: true
            }
        ).then(insertResult => {
            req.session.message = 'hobbies added successfully';
            return res.redirect('/hobbies');
        }).catch(e => {
            req.session.message = 'Hobbies not saved';
            console.log(e)
            return res.redirect('/hobbies');
        })
    } else {
        //no hobby or hobbies found
        req.session.message = "Please add at least on hobby"
        return res.redirect('/hobbies');
    }
})

Router.put('/', async (req, res) => {
    const theHobby = req.body.theHobby;
    console.log(`I have recieved ${theHobby}`)
    schema.updateOne(
        { user_id: res.theUser._id },
        { $pull: { hobby: theHobby } })
        .then((result) => {
            //console.log('Document updated successfully:', result);
            return res.send(buildUpdateResponse(true, null))
        })
        .catch((error) => {
            console.error('Error updating document:', error);
            return res.send(buildUpdateResponse(false, error))
        });
})

function buildUpdateResponse(success, reason) {
    return {
        success,
        reason
    }
}

module.exports = Router;
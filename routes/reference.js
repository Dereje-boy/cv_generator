const express = require('express')
const mongoose = require('mongoose')

//reference schema
const schema = require('../models/reference');

const Router = express.Router();

Router.get('/', async (req, res) => {
    //console.log(req.session.message);
    try {
        const references = await schema.find({ user_id: res.theUser._id });
        let referencesData = [];
        for (let i = 0; i < references.length; i++) {

            thisRef = {
                fullname: references[i].fullname,
                phoneNumber: references[i].phoneNumber,
                email: references[i].email,
                role: references[i].role,
                objectID: references[i]._id
            }
            referencesData.push(thisRef)
        }
        console.log('references', referencesData)
        res.render('reference',
            {
                message: req.session.message,
                referencesData: referencesData,
                email: res.theUser.email
            }
        )
    } catch (error) {
        res.render('reference', { message: 'unable to load reference Data', email: res.theUser.email })
        console.log(error)
    }
    delete req.session.message;
})

Router.post('/', (req, res) => {

    const reference = new schema({
        fullname: req.body.fullname,
        phoneNumber: req.body.phone,
        email: req.body.email,
        role: req.body.role,
        user_id: res.theUser._id
    })

    reference.save().then(insertResult => {
        req.session.message = "reference added message";
        return res.redirect('/reference')
        //console.log(insertResult)
    }).catch(error => {
        console.log(error)
        req.session.message = "Unable to save the reference " + error;
        return res.redirect('/reference')
    })
})

Router.delete('/', async (req, res) => {
    console.log(req.body)
    schema.deleteOne({ _id: new mongoose.Types.ObjectId(req.body.id) }).then(deleteResult => {
        console.log(deleteResult)
        if (deleteResult.deletedCount) {
            res.send({
                success: true,
                reason: null
            })
        } else {
            res.send({
                success: false,
                reason: null
            })
        }
    }).catch(e => {
        console.log(e);
        res.send({
            success: false,
            reason: e
        })
    })
})

module.exports = Router;
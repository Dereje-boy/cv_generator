const express = require('express')
const jwt = require('jsonwebtoken')

const Router = express.Router();

//users schema to search for existing users
const userSchema = require('../models/user');

Router.get('', async (req, res) => {
    const token = req.cookies.token;
    if (!token)
        return res.send("logging in.....")
    jwt.verify(token, 'my-secret-key', (err, theVerifiedUser) => {
        //up on next check the user in the db
        //for now if it found in the client browser skip checking
        if (err) return res.send('logging in....')
        //console.log(theVerifiedUser);
        req.session.theUser = theVerifiedUser;
        res.redirect('/')
    })
})

Router.post('', async (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    }

    userSchema.findOne({ email: user.email }).then(doc => {
        //console.log(doc);

        // if the user not found run this
        if (doc === null)
            return buildResponse(res, false, null, `No user is found with email : ${user.email}`)

        jwt.verify(doc.password, 'my-secret-key', (error, thePassword) => {
            if (error)
                return buildResponse(res, false, null, `The user is found unable to check the password existance, Contact the backend developer : ${user.email}`)
            //check the password similarity
            if (thePassword == user.password) {
                return buildResponse(res, true, user, null)
            } else {
                return buildResponse(res, false, user, 'The password is incorrect')
            }

        })
    }).catch(error => {
        console.log(error)
        return buildResponse(res, false, null, 'Unable to process the query, wrong with the database')
    })
})

function buildResponse(res, success, user, error) {
    //console.log('unable to store the user cookie');
    let response = {
        success,
        user,
        error
    }

    //if success try to save the cookie
    if (success)
        jwt.sign(user, 'my-secret-key', (err, signedToken) => {
            if (err) {
                response.success = false;
                response.error = 'unable to create token to save it in cookies'
                return res.send(response);
            }
            res.cookie('token', signedToken);
            return res.send({
                success,
                user,
                error: null
            }
            );
        })

    else return res.send(response)
}

module.exports = Router;
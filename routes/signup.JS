const express = require('express');
const Router = express.Router();

//mongo model to work with userSchema
const user = require('../models/user');

const errorStatus = require('../model/user/saveNewUser');
const inputChecker = require('../model/user/inputChecker');
const jwt = require('jsonwebtoken');


Router.get('/', async (req, res) => {
    res.render("signup", { message: req.session.message })
    delete req.session.message;
})

Router.post('/', async (req, res) => {
    const { email, password, passwordRepeat } = req.body;

    //name of the event to emitted while input has an error
    const eventName = 'inputCheckFailed';

    //before going anywhere check the input first
    let checker = new inputChecker();

    //listen for the respective event
    checker.on(eventName, async (Error) => {

        //if there is an error ErrorMessage 
        // will have a string value, otherwise false
        if (Error) {
            console.log(Error);
            return res.send(Error);
        }
        //false or else execute if there is no error
        else {
            console.log(
                "\n==========================================" +
                "\n   Input Check Passed, No Error Message" +
                "\n=========================================="
            );
            try {
                const newUser = {
                    email,
                    password
                }
                const insertResultResponse = await saveUser(email, password);
                console.log(insertResultResponse);
                if (insertResultResponse.status === true) {
                    let response = {
                        //false mean no error, only while sending to frontend
                        status: false,
                        message: "Successfully Registered, Now redirecting you to dashboard"
                    }
                    return successfullyRegistered(res, newUser, response);
                    // console.log(response);
                    //return res.send(response)
                } else {
                    let response = {
                        status: errorStatus.DBServerError,
                        message: "Not Registered, Please try again latter."
                    }
                    //if and only if the error is due to duplicat error
                    if (insertResultResponse.status === errorStatus.emailDuplicate) {
                        return res.send({
                            status: insertResultResponse.status,
                            message: insertResultResponse.message
                        })
                    }
                    //if error is other than email duplicate
                    //console.log(response);
                    return res.send(response)
                }
            } catch (error) {
                console.log(error);
                let response = {
                    status: errorStatus.DBServerError,
                    message: "Not Registered, Please try again latter."
                }
                return res.send(response)
            }
        }
    })
    checker.checkAll(email, password, passwordRepeat);
})

async function saveUser(email, password) {
    const newUser = new user({
        email,
        password
    });
    try {
        let response = {
            status: true,
            message: 'NO Error The User Saved Successfully.'
        };
        let insertResult = await newUser.save();
        // console.log("inserting new user....");
        // console.log({ insertedUser: insertResult });
        // console.log({ response: response });
        return response;
    } catch (e) {
        let response = {};

        //if duplicate error e.code == 11000 from mongoose schema.
        if (e.code === 11000) {
            response = {
                status: errorStatus.emailDuplicate,
                message: 'Email already used, Try with new email or click forgot to get back your account',
            }
            console.log('\n====== Error =====\n', response, '\n===== Error ====\n')
            return response;
        }
        response = {
            status: errorStatus.errorNotKnown,
            message: "Error found while saving to the db"
        }
        console.log('\n====== Error =====\n', response, '\n===== Error ====\n')
        return response;
    }
}

function successfullyRegistered(res, theUser, response) {
    jwt.sign(theUser, 'my-secret-key', (err, token) => {
        if (err) {
            console.log('unable to store the user cookie');
            response = {
                status: errorStatus.errorNotKnown,
                message: "Unable to sign the cookie"
            }
            res.send(response)
        } else {
            console.log(token);
            console.log('now redirecting to dashboard page');
            res.cookie("token", token);
            res.send(response);
        }
    })
}

module.exports = Router;
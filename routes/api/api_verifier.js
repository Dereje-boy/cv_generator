const jwt = require('jsonwebtoken');

const cookieVerifier = (cookie) => {

    let result = {
        cookieVerified: false,
        theUser: null,
        reason: undefined,
        solution: '',
    };

    // 1. Is cookie found, different from null and undefined
    if (cookie) {
        jwt.verify(cookie, 'my-secret-key', (error, theUser) => {

            if (error) {
                // console.log('jwt: Invalid cookie token, unable to verify it. ', error.message)
                result = {
                    cookieVerified: false,
                    theUser: null,
                    reason: 'Invalid Cookie',
                    solution: "Please, re login or sign up"
                }
            }

            else {
                result = {
                    cookieVerified: true,
                    theUser: theUser,
                    reason: undefined,
                    solution: "Everything is fine"
                }
            }
        })
    } else {
        result = {
            cookieVerified: false,
            theUser: null,
            reason: 'The cookie is either null, undefined or empty string',
            solution: "Please, login or sign up"
        }
    }

    return result;
}

module.exports = cookieVerifier;
//mongo model to work with userSchema
const user = require('../../models/user');

module.exports = async function saveUser(email, password) {
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
        console.log("inserting new user....");
        console.log({ insertedUser: insertResult });
        console.log({ response: response });
        return response;
    } catch (e) {
        let response = {};
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

module.exports = errorStatus = {
    //password error
    passwordSimilar: "Password Similar",
    passwordLongEnough: "Password Long Enough",

    //message error
    emailContainsAt: "Email Contains @",
    emailLongEnough: "Email Long Enough",
    emailContainsDot: 'emailContainsDot',

    //mongo server error
    DBServerError: "Unable to save the user",
    emailDuplicate: 'Email duplicated',
    errorNotKnown: 'Error found in DB server, but not identified yet'
}

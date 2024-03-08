const checkUserExist = require('../model/user/checkUserExist');
const jwt = require('jsonwebtoken');

const verifier = (req, res, next) => {
    // console.log("checking the cookies in the client browser");
    // console.log(req.cookies.token);

    //1. first check if the right cookie available
    const token = req.cookies.token;
    //console.log(token);

    //check to cookie
    if (token) {
        jwt.verify(token, 'my-secret-key', async (error, theUser) => {
            //unable to verify the cookie so render login page
            if (error) {
                console.log(error.message)
                return renderSignupPage(res, req);
            };

            //checking the user with verified email address exist
            const userExist = checkUserExist.check(theUser.email).then(userExist => {
                //if it exist it send us email and _id of the user
                // console.log('checking the user exist ? ', userExist)

                return userExist ? renderDashboardPage(res, next, userExist) : renderSignupPage(res, req);

            }).catch(e => {
                renderSignupPage(res, req);
            })
        })
    } else {
        //the cookie is not found at all
        //the client might be using our system for the first time
        //so directly redirect to login page
        return renderSignupPage(res, req);
    }
}

//if verified render dashboard page
function renderDashboardPage(res, next, theVerifiedUser) {
    res.theUser = theVerifiedUser != null ?
        theVerifiedUser :
        { email: "", _id: "" };
    return next();
}

//if not verified or the token is not found
//render login page
function renderSignupPage(res, req) {
    req.session.message = "Sign in first";
    res.redirect('/signup');
}

module.exports = verifier;
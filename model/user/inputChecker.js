const EventEmitter = require('events')

//custom data
const eventName = 'inputCheckFailed';
const errorStatus = require('./saveNewUser');



class inputChecker extends EventEmitter {
    constructor() {
        super();
    }

    /**
        * @param email the actual email recieved from frontend
        * @param password the first password recieved from frontend
        * @param repeatPassword the second password, to be used for checking similarity
    */
    checkAll(email, password, repeatPassword) {

        /* 
        ========================================
        ======== Password Checking =============
        ========================================
        */

        // 1. password similar
        if (!this.passwordSimilar(password, repeatPassword))
            return this.emit(eventName, this.buildErrorMessage(errorStatus.passwordSimilar));


        //2. long enough
        if (!this.passwordLongEnough(password, repeatPassword)) {
            console.log("password not long enough error raised not worked.....");
            return this.emit(eventName, this.buildErrorMessage(errorStatus.passwordLongEnough))
        }

        /* 


        #=====================================#
        #======== Email Checking =============#
        #=====================================#
        */

        //1. contains At
        if (!this.emailContainsAt(email))
            return this.emit(eventName, this.buildErrorMessage(errorStatus.emailContainsAt))

        //2. long enough
        if (!this.emailLongEnough(email)) {
            return this.emit(eventName, this.buildErrorMessage(errorStatus.emailLongEnough));
        }

        //3. email contains dot
        if (!this.emailContainsDot(email)) {
            return this.emit(eventName, this.buildErrorMessage(errorStatus.emailContainsDot));
        }

        /* 
        ===============================================
        === No Error? return the following =============
        ================================================
        */

        return this.emit(eventName, false);
    }

    buildErrorMessage(comingErrorStatus) {
        let message = "";

        switch (comingErrorStatus) {
            case errorStatus.passwordSimilar:
                message = 'Password isnot similar'
                break;
            case errorStatus.passwordLongEnough:
                message = 'Password should be at least five (5) character long'
                break;
            case errorStatus.emailContainsAt:
                message = 'Email address should contain @ symbol'
                break;
            case errorStatus.emailLongEnough:
                message = 'Email should be at least six (6) character long'
                break;
            case errorStatus.emailContainsDot:
                message = 'Email should contain Dot (.)'
                break;
            default:
                message = "The error is not among defined"
                break;
        }
        let Error = {
            status: comingErrorStatus,
            message: message,
        }
        return Error;
    }

    // ======== Password Checking ==============
    //==========================================

    passwordSimilar(password, repeatPassword) {
        if (password == repeatPassword) {
            return true;
        }
        else {
            console.log(password, repeatPassword);
            return false;
        }
    }

    //passwordS shouldnot be undefined null or empty string
    //so they should be valid

    //checking the length of the passwordS
    passwordLongEnough(password, repeatPassword) {
        if (password.length < 5 || repeatPassword < 5)
            return false;
        else
            return true;
    }

    // ============ Email Checking ===========
    // =======================================

    //email address should contain @ symbol
    emailContainsAt(email) {
        if (email.indexOf('@') === -1)
            return false;
        else
            return true;
    }

    //email contains .
    emailContainsDot(email) {
        if (email.indexOf('.') == -1)
            return false;
        else
            return true;
    }

    //at least six chars
    emailLongEnough(email) {
        if (email.length < 6)
            return false;
        else
            return true;
    }


    /* 
    //this depreceated use the upper one
        check(email, password, repeatPassword) {
            //passowrdS shouldnot be undefined null or empty string
    
    
            //email shouldnot be undefined null or empty string
    
            //password similar
            this.passwordSimilar(password, repeatPassword) ?
                null :
                this.emit(eventName, 'Password isnot similar');
    
            //email should have @ symbol
            this.emailContainsAt(email) ?
                null :
                this.emit(eventName, 'Email address should contain @ symbol');
    
            //email should be >= 5 characters    
            this.emailLongEnough(email) ?
                null :
                this.emit(eventName, 'Email should be at least five (5) character long');
    
            //email should contain dot symbol
            this.emailContainsDot(email) ?
                null :
                this.emit(eventName, 'Email should contain Dot (.)');
        }
     */
}

module.exports = inputChecker;
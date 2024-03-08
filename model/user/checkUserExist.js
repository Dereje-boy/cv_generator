const userSchema = require('../../models/user');

const check = async (emailAddress) => {

    try {
        const userExist = await userSchema.find({ email: emailAddress })
        return userExist.length ?
            { email: userExist[0].email, _id: userExist[0]._id }
            :
            false;

    } catch (error) {
        return false;
    }

}

module.exports.check = check;
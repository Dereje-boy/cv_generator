const factorME = require('./utility');
const personal_information = require('../../models/personalInformation');
const {ObjectId} = require('mongodb')

async function renderBasicInformation(doc, email) {
    console.log('rendering the basic information');

    try {
        dbData = await personal_information.findOne({ email })
        theUserInfo = dbData ? dbData : {
            _id: new ObjectId('65ed7855b580e835f4730a54'),
            user_id: new ObjectId('65df987dd88473f5edfc5e27'),
            __v: 0,
            aboutMe: "Describe yourself in short and concise way here, to easily get accepted for further qualification.",
            city: 'yourCity',
            email: 'someone@gmail.com',
            firstname: 'firstname',
            lastname: 'lastname',
            phoneNumber: '0900000000',
            state: 'some state'
        }
        //console.log('userInfo', theUserInfo);

        // Applicant fullname
        doc.font('fonts/cambriab.ttf')
            .fillColor('white')
            .fontSize(factorME(10))
            .text(`${theUserInfo.firstname.toUpperCase()} ${theUserInfo.lastname.toUpperCase()}`, factorME(48), factorME(4), {
                align: 'center',
            })

        //rendering phone no...
        doc.font('fonts/cambriab.ttf')
            .fillColor('white')
            .fontSize(factorME(6))
            .text(`${theUserInfo.phoneNumber}`, factorME(48), factorME(35), {
                align: 'left',
                width: factorME(79)
            })
        //rendering email address..
        doc.font('fonts/cambriab.ttf')
            .fillColor('white')
            .fontSize(factorME(6))
            .text(`${theUserInfo.email}`, factorME(125), factorME(35), {
                align: 'center',
                width: factorME(79)
            })

        //rendering about me text itself
        doc.font('fonts/cambriab.ttf')
            .fillColor('white')
            .fontSize(factorME(9))
            .text('About Me', factorME(0), factorME(52), {
                align: 'center',
                width: factorME(210)
            })

        //rendering about me
        doc.font('fonts/cambriab.ttf')
            .fillColor('white')
            .fontSize(factorME(5))
            .text(`${theUserInfo.aboutMe}`, factorME(4), factorME(65), {
                align: 'center',
                width: factorME(202)
            })



    } catch (error) {
        console.log(`error fetching the user with the email ${email}`, error);
    }


    return doc;
}


module.exports = renderBasicInformation
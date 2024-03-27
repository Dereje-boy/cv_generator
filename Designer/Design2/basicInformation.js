const factorME = require('./utility');
const personal_information = require('../../models/personalInformation');
const {ObjectId} = require('mongodb')

async function renderBasicInformation(doc, email) {
    // console.log('rendering the basic information');

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
        
        // Applicant firstname
        doc.font('fonts/times/timesbd.ttf')
            .fillColor('#E0D3C6')
            .fontSize(factorME(15))
            .text(theUserInfo.firstname.toUpperCase(), factorME(73), factorME(2), {
                align: 'left',
            })

        // Applicant lastname
        doc.font('fonts/times/timesbd.ttf')
            .fillColor('#E0D3C6')
            .fontSize(factorME(15))
            .text(theUserInfo.lastname.toUpperCase(), factorME(73), factorME(16), {
                align: 'left',
            })

        //rendering email address as a place holder for the profession..
        doc.font('fonts/times/timesbd.ttf')
            .fillColor('#E0D3C6')
            .fontSize(factorME(5))
            .text(`${theUserInfo.email.toUpperCase()}`, factorME(73), factorME(36), {
                align: 'left',
                width: factorME(79)
            })

        // ===== ABOUT ME====

        //rendering "About Me" text itself
        doc.font('fonts/segoeui/segoeuib.ttf')
            .fillColor('black')
            .fontSize(factorME(6))
            .text('ABOUT ME', factorME(72), factorME(55), {
                align: 'left',
            })

        //the underline line
        doc.rect(factorME(72), factorME(66), factorME(138), factorME(.5))
            .fill('#4B3C3C');

        //rendering about me
        doc.font('fonts/times/times.ttf')
            .fillColor('black')
            .fontSize(factorME(4))
            .text(`${theUserInfo.aboutMe}`, factorME(72), factorME(70), {
                align: 'left',
            })

        // ===== PERSONAL DETAILS ====
        //rendering "PERSONAL DETAILS" text itself
        doc.font('fonts/segoeui/segoeuib.ttf')
            .fillColor('black')
            .fontSize(factorME(6))
            .text('PERSONAL DETAILS', factorME(4.75), factorME(67.5), {
                align: 'left',
            })

        //the underline line
        doc.rect(factorME(4.75), factorME(78.5), factorME(61.75), factorME(.5))
            .fill('#4B3C3C');

        //rendering phone no...
        doc.font('fonts/segoeui/segoeuib.ttf')
            .fillColor('black')
            .fontSize(factorME(4))
            .text(`${theUserInfo.phoneNumber}`, factorME(18), factorME(86), {
                align: 'left',
            })
        //rendering email address..
        doc.font('fonts/segoeui/segoeuib.ttf')
            .fillColor('black')
            .fontSize(factorME(4))
            .text(`${theUserInfo.email}`, factorME(18), factorME(95), {
                align: 'left'
            })

        //rendering city, state
        doc.font('fonts/segoeui/segoeuib.ttf')
            .fillColor('black')
            .fontSize(factorME(4))
            .text(`${theUserInfo.city}, ${theUserInfo.state}`, factorME(18), factorME(104), {
                align: 'left'
            })

    } catch (error) {
        console.log(`error fetching the user with the email ${email}`, error);
    }


    return doc;
}


module.exports = renderBasicInformation
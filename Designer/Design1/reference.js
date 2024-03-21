const factorME = require('./utility');
const schema = require('../../models/reference');
const {ObjectId} = require('mongodb')

async function renderReference(doc, _id) {
    try {
        thisUserReference = await schema.find({user_id: new ObjectId(_id.toString())});

        //reference title, reference/s is/are found
        //horizontal line, actually by using rectangle, reference/s is/are found
        console.log('this users reference', thisUserReference.length)
        if (thisUserReference.length){
            doc.font('fonts/cambriab.ttf')
                .fillColor('#FFDD00')
                .fontSize(factorME(13))
                .text('Reference', {
                    align: 'left',
                    width: factorME(97),
                })
            doc.rect(doc.x, doc.y, factorME(97), factorME(1))
                .fillAndStroke('#FFCC00');
        }

        // console.log('this users reference', thisUserReference)
        thisUserReference.forEach(thisRef=>{

            doc.moveDown(.3)

            //full name
            doc.font('fonts/cambriab.ttf')
                .fillColor('#C25757')
                .fontSize(factorME(5))
                .text(thisRef.fullname.toUpperCase())

            //horizontal line, to end one reference
            // doc.rect(doc.x, doc.y, factorME(97), factorME(.5))
            //     .fillAndStroke('blue');


            doc.moveDown(.3)

            //role
            doc.font('fonts/cambriab.ttf')
                .fillColor('black')
                .fontSize(factorME(4))
                .text(thisRef.role)

            doc.moveDown(.3)

            //email and phone no. on the same line
            doc.font('fonts/cambriab.ttf')
                .fontSize(factorME(4))
                .fillColor('black')
                .text('Email: '+thisRef.email.toUpperCase())
                .text('Phone: '+thisRef.phoneNumber)

            doc.moveDown(1)
        })
    }catch (e) {
        console.log("Error while rendering reference", e)
    }

    return doc;
}


module.exports = renderReference;
const factorME = require('./utility');
const schema = require('../../models/reference');
const {ObjectId} = require('mongodb')

async function renderReference(doc, _id) {
    try {
        thisUserReference = await schema.find({user_id: new ObjectId(_id.toString())});

        console.log('this users reference', thisUserReference.length)

        //reference title, reference/s is/are found
        //horizontal line, actually by using rectangle, reference/s is/are found
        if (thisUserReference.length){
            doc.font('fonts/segoeui/segoeuib.ttf')
                .fillColor('black')
                .fontSize(factorME(6))
                .text('REFERENCES', factorME(5.25), factorME(122), {
                    align: 'left',
                })

            //the underline line
            doc.rect(factorME(5.25), factorME(132.5), factorME(61.75), factorME(.5))
                .fill('#4B3C3C');
        }

        // console.log('this users reference', thisUserReference)
        thisUserReference.forEach(thisRef=>{

            doc.moveDown(1)

            //full name
            doc.font('fonts/segoeui/segoeui.ttf')
                .fillColor('black')
                .fontSize(factorME(4))
                .text(thisRef.fullname.toUpperCase())

            doc.moveDown(.3)

            //role
            doc.font('fonts/segoeui/segoeuil.ttf')
                .fillColor('black')
                .fontSize(factorME(4))
                .text(thisRef.role.toUpperCase(),{width:factorME(60)})

            doc.moveDown(.3)

            //email
            doc.font('fonts/segoeui/segoeuil.ttf')
                .fillColor('black')
                .fontSize(factorME(4))
                .text(thisRef.email.toUpperCase())

            doc.moveDown(.3)

            //phone
            doc.font('fonts/segoeui/segoeuil.ttf')
                .fillColor('black')
                .fontSize(factorME(4))
                .text(thisRef.phoneNumber)

            doc.moveDown(.8)

        })
    }catch (e) {
        console.log("Error while rendering reference", e)
    }

    return doc;
}


module.exports = renderReference;
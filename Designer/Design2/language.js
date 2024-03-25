const factorME = require('./utility');
const schema = require('../../models/language');
const {ObjectId} = require('mongodb')

async function renderLanguage(doc, _id) {
    try {
        thisUserLanguages = await schema.find({user_id:new ObjectId(_id.toString())})
        //console.log('this user languages ', thisUserLanguages)

        if (thisUserLanguages.length){
            //language title
            doc.font('fonts/segoeui/segoeuib.ttf')
                .fillColor('black')
                .fontSize(factorME(6))
                .text('LANGUAGES', {
                    align: 'left',
                })

            doc.moveDown(.3)

            //the underline line
            doc.rect(doc.x, doc.y, factorME(61.75), factorME(.5))
                .fill('#4B3C3C');
        }

        doc.moveDown(.5)

        thisUserLanguages.forEach(thisLang=>{
            //the language and the level respectively on the same line
            doc.font('fonts/segoeui/segoeuib.ttf')
                .fillColor('black')
                .fontSize(factorME(4))
                .text(thisLang.language.toUpperCase());

            doc.moveDown(.3)

            doc.font('fonts/segoeui/segoeui.ttf')
                .fillColor('black')
                .fontSize(factorME(4))
                .text(thisLang.level[0],doc.x+15,doc.y);
            doc.x = doc.x-15

            doc.moveDown(.8)
        })
    }catch (e) {

    }


    return doc;
}

module.exports = renderLanguage;
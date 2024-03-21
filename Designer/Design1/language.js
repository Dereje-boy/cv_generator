const factorME = require('./utility');
const schema = require('../../models/language');
const {ObjectId} = require('mongodb')

async function renderLanguage(doc, _id) {
    try {
        thisUserLanguages = await schema.find({user_id:new ObjectId(_id.toString())})
        //console.log('this user languages ', thisUserLanguages)

        if (thisUserLanguages.length){
            //langauge title
            doc.font('fonts/cambriab.ttf')
                .fillColor('#FFDD00')
                .fontSize(factorME(13))
                .text('Languages', {
                    align: 'left',
                    width: factorME(97),
                })

            //horizontal line, actually by using rectangle
            doc.rect(doc.x, doc.y, factorME(97), factorME(1))
                .fillAndStroke('#FFCC00');
        }

        doc.moveDown(.3)

        thisUserLanguages.forEach(thisLang=>{
            //the language and the level respectively on the same line
            doc.font('fonts/cambriab.ttf')
                .fillColor('blue')
                .fontSize(factorME(5))
                .text(thisLang.language.toUpperCase()).fillColor('#C25757')
                .fontSize(factorME(4))
                .text(thisLang.level[0])
            doc.moveDown(.5)
        })
    }catch (e) {

    }


    return doc;
}

module.exports = renderLanguage;
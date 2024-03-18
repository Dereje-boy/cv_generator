const schema = require('../../models/hobbies')
const {ObjectId} = require('mongodb')
const factorMe = require('./utility')
const factorME = require("./utility");

async function renderHobbies(doc, _id) {
    console.log("rendering hobbies....")
    try{
        const Hobbies = await schema.find({user_id: new ObjectId(_id.toString())})
        const thisUserHobbies = Hobbies[0].hobby.join(', ')
        // console.log('This user hobbies = ',thisUserHobbies)

        //Writing Hobbies as header
        doc.font('fonts/cambriab.ttf')
            .fillColor('#FFDD00')
            .fontSize(factorME(13))
            .text('Hobbies', {
                align: 'left',
                width: factorME(97),
            })

        //horizontal line, actually by using rectangle
        doc.rect(doc.x, doc.y, factorME(97), factorME(1))
            .fillAndStroke('#FFCC00');

        doc.moveDown(.3)

        //role
        doc.font('fonts/cambriab.ttf')
            .fillColor('black')
            .fontSize(factorME(4))
            .text(thisUserHobbies)

    }catch (e) {
        console.log('Error in fetching hobbies\n',e)
    }

    return doc;
}

module.exports = renderHobbies;
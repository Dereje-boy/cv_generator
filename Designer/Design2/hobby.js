const schema = require('../../models/hobbies')
const {ObjectId} = require('mongodb')
const factorMe = require('./utility')
const factorME = require("./utility");

async function renderHobbies(doc, _id) {
    console.log("rendering hobbies....")
    try{
        const Hobbies = await schema.find({user_id: new ObjectId(_id.toString())})
        const thisUserHobbies = Hobbies[0]?.hobby.join(', ')
        // console.log('This user hobbies = ',thisUserHobbies)

        //Writing Hobbies as header, if hobbies are found
        if (thisUserHobbies){
            doc.font('fonts/segoeui/segoeuib.ttf')
                .fillColor('black')
                .fontSize(factorME(6))
                .text('HOBBIES')

            doc.moveDown(.3)

            //the underline line
            doc.rect(doc.x, doc.y, factorME(61.75), factorME(.5))
                .fill('#4B3C3C');
        }
        //horizontal line, actually by using rectangle, if hobbies are found
        doc.moveDown(.3)

        //role
        doc.font('fonts/segoeui/segoeuil.ttf')
            .fillColor('black')
            .fontSize(factorME(4))
            .text(thisUserHobbies,{width:factorME(61.75),align:'center'})

    }catch (e) {
        console.log('Error in fetching hobbies\n',e)
    }

    return doc;
}

module.exports = renderHobbies;
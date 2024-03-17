const schema = require('../../models/education');
const { ObjectId } = require('mongodb')
const factorME = require('./utility');

async function renderEducation(doc, _id) {
    try{
   const userEducation = await schema.find({ user_id: new ObjectId(_id.toString()) })
    // console.log('user Education ', userEducation)

    //make sure the doc is in the first page
    //doc.switchToPage(doc.bufferedPageRange().start)
    //console.log(doc.bufferedPageRange())

    //Writing the work experience as header
    doc.font('fonts/cambriab.ttf')
        .fillColor('#FFDD00')
        .fontSize(factorME(13))
        .text("Education", factorME(113), factorME(90), {
            align: 'left',
        })

    //rendering the line underlined for the word experience
    doc.rect(factorME(113), factorME(106), factorME(97), factorME(1))
        .fill('#ffcc00');

    userEducation.forEach(thisEdu=>{

        doc.moveDown(.5)

        //diploma name
        doc.font('fonts/cambriab.ttf')
            .fillColor('#C25757')
            .fontSize(factorME(5))
            .text(thisEdu.titleOfDocument.toString().toUpperCase(), {
                align: 'left',
                width: factorME(95),
            })

        doc.moveDown(.1)

        //year of completion and CGPA on similar line
        theText = `Year : ${new Date(thisEdu.yearOfGraduation).getFullYear().toString().toUpperCase()} \t\t\t\t\t\t\t\t CGPA : ${thisEdu.CGPA.toString().toUpperCase()}`;
        doc.font('fonts/cambriab.ttf')
            .fillColor('#005DFF')
            .fontSize(factorME(4))
            .text(theText, {
                align: 'left',
            })

        //CGPA
        // doc.font('fonts/cambriab.ttf')
        //     .fillColor('#005DFF')
        //     .fontSize(factorME(4))
        //     .text('CGPA : '+thisEdu.CGPA.toString().toUpperCase(), {
        //         align: 'right',
        //     })

        doc.moveDown(.1)

        //Name of the College
        doc.font('fonts/cambriab.ttf')
            .fillColor('#005DFF')
            .fontSize(factorME(4))
            .text('From : '+thisEdu.nameOfUniversity.toString().toUpperCase(), {
                align: 'left',
                width: factorME(95),
            })

        doc.moveDown(1)

    })
    }catch (e) {

    }

    return doc
}


module.exports = renderEducation;
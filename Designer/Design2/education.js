const schema = require('../../models/education');
const { ObjectId } = require('mongodb')
const factorME = require('./utility');

async function renderEducation(doc, _id) {
    try{
   const userEducation = await schema.find({ user_id: new ObjectId(_id.toString()) })
    // console.log('user Education ', userEducation)

    // make sure the doc is in the first page/
    doc.switchToPage(doc.bufferedPageRange().start)
    // console.log(doc.bufferedPageRange().start)

    //Writing the Education as header
    doc.font('fonts/segoeui/segoeuib.ttf')
        .fillColor('black')
        .fontSize(factorME(6))
        .text('EDUCATIONS',factorME(72), factorME(102))

    //the underline line
    doc.rect( factorME(72),  factorME(113), factorME(138), factorME(.5))
        .fill('#4B3C3C');

    doc.moveDown(1)

    userEducation.forEach(thisEdu=>{
        //diploma name
        doc.font('fonts/cambriab.ttf')
            .fillColor('black')
            .fontSize(factorME(5))
            .text(thisEdu.titleOfDocument.toString().toUpperCase(), {
                align: 'left',
                width: factorME(135),
            })

        doc.moveDown(.1)

        //year of completion and CGPA on similar line
        theText = `Year : ${new Date(thisEdu.yearOfGraduation).getFullYear().toString().toUpperCase()}                CGPA : ${thisEdu.CGPA.toString().toUpperCase()}`;
        // console.log(theText);
        doc.font('fonts/segoeui/segoeui.ttf')
            .fillColor('black')
            .fontSize(factorME(4))
            .text(theText, {
                align: 'left',
                width: factorME(135),
            })

        doc.moveDown(.1)

        //Name of the College
        doc.font('fonts/segoeui/segoeui.ttf')
            .fillColor('black')
            .fontSize(factorME(4))
            .text('From : '+thisEdu.nameOfUniversity.toString().toUpperCase(), {
                align: 'left',
                width: factorME(135),
            })

        doc.moveDown(1)

    })
    }catch (e) {
        console.log("Error while rendering education in Design 2", e);
    }

    return doc
}


module.exports = renderEducation;
const factorME = require('./utility');
const { ObjectId } = require('mongodb')

//experience schema
const schema = require('../../models/experience');

async function renderExperience(doc, _id) {
    try {

        const experiences = await schema.find({
            user_id: new ObjectId(_id.toString())
        });

        //console.log('experiences... of this user \n', experiences)
        console.log('rendering experience...')

        //Experience might span to 2 or more pages
        // var currentPage = 0;
        // if (currentPage===0)
        //     doc.on('pageAdded',()=>{
        //         currentPage++;
        //         doc.switchToPage(currentPage)
        //     })

        //Writing the work experience as header
        doc.font('fonts/segoeui/segoeuib.ttf')
            .fillColor('black')
            .fontSize(factorME(6))
            .text('EXPERIENCE', doc.x, doc.y)

        doc.moveDown(.3)

        //the underline line
        doc.rect( doc.x, doc.y, factorME(138), factorME(.5))
            .fill('#4B3C3C');

        doc.moveDown(.5)

        //writing the actual experience/s of this user
        experiences.forEach((thisExp, index) => {
            // write position
            doc.font('fonts/cambriab.ttf')
                .fillColor('black')
                .fontSize(factorME(5))
                .text(index + 1 + '. ' + thisExp.position.trim().toUpperCase(),{width:factorME(135)})

            doc.moveDown(.3)

            //write start Date
            doc.font('fonts/segoeui/segoeui.ttf')
                .fillColor('black')
                .fontSize(factorME(4))
                .text('Date: ' + facilitateDate(thisExp.startDate, thisExp.endDate),{width:factorME(135),align:'left'})

            doc.moveDown(.3)

            //write company name
            doc.font('fonts/segoeui/segoeui.ttf')
                .fillColor('black')
                .fontSize(factorME(4))
                .text("At: "+thisExp.companyName.toUpperCase(),
                    {width:factorME(135),align:'left'})

            doc.moveDown(.3)

            //write about experience
            doc.font('fonts/segoeui/segoeui.ttf')
                .fillColor('black')
                .fontSize(factorME(4))
                .text(thisExp.aboutExperience,
                    {width:factorME(135),align:'left'})

            doc.moveDown(1)

        });
    } catch (e) {
        console.log('experience error',e)
    }

    return doc;

}

/*
        // experiences.forEach((thisExp, index) => {

        //     const thisExpHeight = Height_of_single_exp * index;

        //     //write position
        //     doc.font('fonts/cambriab.ttf')
        //         .fillColor('black')
        //         .fontSize(factorME(6))
        //         .text("Position Name 1", factorME(0), factorME(107 + thisExpHeight), {
        //             align: 'center',
        //             width: factorME(100)
        //         })

        //     //write start Date
        //     doc.font('fonts/cambriab.ttf')
        //         .fillColor('black')
        //         .fontSize(factorME(5))
        //         .text("Start Date to End Date or Current(-)", factorME(0), factorME(117 + thisExpHeight), {
        //             align: 'center',
        //             width: factorME(100)
        //         })


        //     //write company name
        //     doc.font('fonts/cambriab.ttf')
        //         .fillColor('black')
        //         .fontSize(factorME(5))
        //         .text("Company Name", factorME(0), factorME(127 + thisExpHeight), {
        //             align: 'center',
        //             width: factorME(100)
        //         })

        //     //write about experience
        //     doc.font('fonts/cambriab.ttf')
        //         .fillColor('black')
        //         .fontSize(factorME(5))
        //         .text("Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis cumque vero, modi, enim corporis numquam culpa laboriosam sed dicta unde in laudantium consequatur adipisci velit libero molestias, porro officiis! Libero.", factorME(0), factorME(137 + thisExpHeight), {
        //             align: 'center',
        //             width: factorME(100),
        //             height: factorME(42),
        //         })
        // });
        *
 */

function facilitateDate(startDate, endDate) {
    dateString = '';
    const start = new Date(startDate)
    if (endDate) {
        const end = new Date(endDate)
        dateString = `${start.getDate()}/${start.getMonth() + 1}/${start.getFullYear()} - ${end.getDate()}/${end.getMonth() + 1}/${end.getFullYear()}`
    } else {
        dateString = `${start.getDate()}/${start.getMonth() + 1}/${start.getFullYear()} - Current`
    }
    //console.log(dateString)
    return dateString;
}

module.exports = renderExperience;
const factorME = require('./utility');
const { ObjectId } = require('mongodb')

//experience schema
const schema = require('../../models/experience');

async function renderExperience(doc, _id) {
    try {

        const experiences = await schema.find({
            user_id: new ObjectId(_id.toString())
        });
        //console.log(_id)
        //console.log('experiences... of this user \n', experiences)
        console.log('rendering experience...')


        //make sure the doc is in the first page
        doc.switchToPage(doc.bufferedPageRange().start)
        var currentPage = 0;
        if (currentPage===0)
        doc.on('pageAdded',()=>{
            currentPage++;
            doc.switchToPage(currentPage)
        })
        console.log(doc.bufferedPageRange())

        //Writing the work experience as header
        doc.font('fonts/cambriab.ttf')
            .fillColor('#FFDD00')
            .fontSize(factorME(13))
            .text("Experience", factorME(5), factorME(90), {
                align: 'left',
            })

        //rendering the line underlined for the word experience
        doc.rect(factorME(3), factorME(106), factorME(97), factorME(1))
            .fill('#ffcc00');


        doc.moveDown(.5)

        //writing the actual experience/s of this user
        experiences.forEach((thisExp, index) => {

            // console.log(`x: ${doc.x} \t y:${doc.y}`)

            // write position
            doc.font('fonts/cambriab.ttf')
                .fillColor('blue')
                .fontSize(factorME(5))
                .text(index + 1 + '. ' + thisExp.position.trim().toUpperCase(), {
                    align: 'left',
                    width: factorME(100)
                })

            //heightOfString text
            // console.log('position: ',doc.heightOfString(index + 1 + '. ' + thisExp.position.trim().toUpperCase()));

            // doc.moveDown(.1)

            //write start Date
            doc.font('fonts/cambriab.ttf')
                .fillColor('black')
                .fontSize(factorME(4))
                .text(
                    'Date: ' + facilitateDate(thisExp.startDate, thisExp.endDate),
                    doc.x,
                    doc.y+doc.heightOfString(
                        index + 1 + '. ' + thisExp.position.trim().toUpperCase()
                    )*.5,
                    {
                    align: 'center',
                    width: factorME(98)
                    }
                )

            //heightOfString text
            // console.log('Date: ' , doc.heightOfString(facilitateDate(thisExp.startDate, thisExp.endDate)));

            // doc.moveDown(.1)

            //write company name
            doc.font('fonts/cambriab.ttf')
                .fillColor('black')
                .fontSize(factorME(4))
                .text(
                    thisExp.companyName.toUpperCase(),
                    doc.x,
                    doc.y+doc.heightOfString(facilitateDate(thisExp.startDate, thisExp.endDate))*.5,
                    {
                    align: 'center',
                    width: factorME(98)
                })

            //heightOfString text
            // console.log('company name: ', doc.heightOfString(thisExp.companyName.toUpperCase()));

            // doc.moveDown(.1)

            //write about experience
            doc.font('fonts/cambriab.ttf')
                .fillColor('black')
                .fontSize(factorME(4))
                .text(thisExp.aboutExperience,
                    doc.x,
                    doc.y+doc.heightOfString(thisExp.companyName.toUpperCase())*.5,
                    {
                    width: factorME(95),
                    align: 'center'
                })

            //heightOfString text
            // console.log('about experience: ', doc.heightOfString(thisExp.aboutExperience));
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
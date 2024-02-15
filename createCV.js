const fs = require('fs');
const PDFDocument = require('pdfkit');
const FACTOR = 2.8346;

function factorME(xORy) {
    return xORy * FACTOR;
}


function createCV(fullname) {
    fullname = fullname ? fullname : "Dereje Gezahegn";
    // Create a document
    const doc = new PDFDocument({ size: 'A4' });


    doc.pipe(fs.createWriteStream('cv.pdf'));
    // doc.moveTo(0, 0).image('images\\210x91.png', {
    //     fit: [factorME(210), factorME(91)]
    // });

    //left
    doc.rect(0, 0, factorME(100), factorME(297))
        .fill('#6B6A55');

    //top
    doc.rect(0, 0, factorME(210), factorME(91))
        .fill('#391111');

    // Applicant fullname
    doc.font('fonts/cambriab.ttf')
        .fillColor('#fff')
        .fontSize(factorME(10))
        .text(fullname, factorME(48), factorME(4), {
            align: 'center',
        })

    //applicant user photo
    //photo container to make background white
    // doc.rect(0, 0, factorME(45), factorME(45)).fill('fff').circle(factorME(23), factorME(23), factorME(23)).clip()
    // doc.circle(factorME(23), factorME(23), factorME(23));
    // doc.image('C:\\Users\\Dere\\Downloads\\Dereje_3X4_photo-removebg.png', 0, 0, {
    //     fit: [factorME(45), factorME(45)]
    // });

    //applicant dept
    doc.font('fonts/cambriab.ttf')
        .fillColor('#fff')
        .fontSize(factorME(6))
        .text('BSc in Surveying Engineering', factorME(49), factorME(23), {
            align: 'center',
        })

    //applicant phone no. 📲
    doc.font('fonts/cambriab.ttf')
        .fillColor('#fff')
        .fontSize(factorME(6))
        .text('+25191020304050', factorME(48), factorME(35), {
            align: 'left',
        })

    //applicant email 📩 
    doc.font('fonts/cambriab.ttf')
        .fillColor('#fff')
        .fontSize(factorME(6))
        .text('someuser@gmail.com', factorME(125), factorME(35), {
            align: 'center',
            width: 300
        })

    //applicant About Me =>title
    doc.font('fonts/cambriab.ttf')
        .fillColor('#fff')
        .fontSize(factorME(9))
        .text('About Me', factorME(0), factorME(50), {
            align: 'center',
            width: factorME(210)
        })

    //applicant About Me => actual content
    doc.font('fonts/cambriab.ttf')
        .fillColor('#fff')
        .fontSize(factorME(5))
        .text('I am a STORE MANAGER equipped with extensive experience in automotive sales management. Employs excellent leadership skills and multi-tasking strengths. Demonstrated ability to improve store operations, increase top line sales and reduce costs.', factorME(0), factorME(65), {
            align: 'center',
            width: factorME(210),
            height: factorME(18),
        })

    buildExperience(doc);
    buildEducation(doc);
    buildSkill(doc);
    buildLanguage(doc);
    buildReference(doc);
    buildHobbies(doc);

    //clipping about
    //clipping should be done at the last to make visible of the other document elements
    doc.circle(factorME(23), factorME(23), factorME(23)).clip()
    doc.circle(factorME(23), factorME(23), factorME(23)).fill("#fff");
    doc.image('C:\\Users\\Dere\\Downloads\\Dereje_3X4_photo-removebg.png', 0, 0, {
        fit: [factorME(46), factorME(46)]
    });

    //sample picture, but removed not required and overlay the above image
    // doc.image('C:\\Users\\Dere\\Pictures\\Camera Roll\\WIN_20231107_17_05_02_Pro (2).jpg', 0, 0, {
    //     fit: [factorME(46), factorME(46)],
    //     align: 'center'
    // });

    // Finalize PDF file
    doc.end();

    // res.send("done");


}

function buildExperience(doc) {


    //applicant Experience => title
    doc.font('fonts/cambriab.ttf')
        .fillColor('#FFDD00')
        .fontSize(factorME(13))
        .text('Experience', factorME(5), factorME(90), {
            align: 'left',
            width: factorME(96),
            height: factorME(15),
        })

    //horizontal line
    // doc.moveTo(factorME(3), factorME(106))
    //     .lineTo(factorME(97), factorME(106))
    //     .fillAndStroke('#FFCC00');

    //horizontal line, actually by using rectangle
    doc.rect(factorME(0), factorME(106), factorME(99), factorME(1))
        .fillAndStroke('#FFCC00');

    //vertical line
    // doc.moveTo(factorME(1.5), factorME(105.5))
    //     .lineTo(factorME(1.5), factorME(105.5 + 192))
    //     .fillAndStroke('#FFCC00');

    //vertical line, actually by using rectangle
    doc.rect(factorME(0), factorME(106), factorME(1), factorME(192))
        .fillAndStroke('#FFCC00');

    //creating position 1

    //experience position 1
    doc.font('fonts/cambriab.ttf')
        .fillColor('#fff')
        .fontSize(factorME(6))
        .text('Position Name 1', factorME(0), factorME(107), {
            align: 'center',
            width: factorME(99),
            height: factorME(9),
            underline: true,
        })
    //experience position 1=>start and end date
    doc.font('fonts/cambriab.ttf')
        .fillColor('#fff')
        .fontSize(factorME(5))
        .text('Start Date to End Date or Current', factorME(0), factorME(117), {
            align: 'center',
            width: factorME(99),
            height: factorME(9)
        })
    //experience position 1=>company name
    doc.font('fonts/cambriab.ttf')
        .fillColor('#fff')
        .fontSize(factorME(5))
        .text('Company Name', factorME(0), factorME(127), {
            align: 'center',
            width: factorME(99),
            height: factorME(9)
        })
    //experience position 1=>about experience
    doc.font('fonts/cambriab.ttf')
        .fillColor('#fff')
        .fontSize(factorME(5))
        .text('Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis cumque vero, modi, enim corporis numquam culpa laboriosam sed dicta unde in laudantium consequatur adipisci velit libero molestias, porro officiis! Libero.', factorME(3), factorME(137), {
            align: 'justify',
            width: factorME(96),
            height: factorME(42)
        })


    //experience position 2
    doc.font('fonts/cambriab.ttf')
        .fillColor('#fff')
        .fontSize(factorME(6))
        .text('Position Name 2', factorME(0), factorME(180), {
            align: 'center',
            width: factorME(99),
            height: factorME(9),
            underline: true,
        })
    //experience position 2=>start and end date
    doc.font('fonts/cambriab.ttf')
        .fillColor('#fff')
        .fontSize(factorME(5))
        .text('Start Date to End Date or Current', factorME(0), factorME(190), {
            align: 'center',
            width: factorME(99),
            height: factorME(9),
        })
    //experience position 2=>company name
    doc.font('fonts/cambriab.ttf')
        .fillColor('#fff')
        .fontSize(factorME(5))
        .text('Company Name', factorME(0), factorME(200), {
            align: 'center',
            width: factorME(99),
            height: factorME(9)
        })
    //experience position 2=>about experience
    doc.font('fonts/cambriab.ttf')
        .fillColor('#fff')
        .fontSize(factorME(5))
        .text('Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis cumque vero, modi, enim corporis numquam culpa laboriosam sed dicta unde in laudantium consequatur adipisci velit libero molestias, porro officiis! Libero.', factorME(3), factorME(210), {
            align: 'justify',
            width: factorME(96),
            height: factorME(42)
        })



}

function buildEducation(doc) {

    //applicant Education => title
    doc.font('fonts/cambriab.ttf')
        .fillColor('#FFDD00')
        .fontSize(factorME(13))
        .text('Education', factorME(113), factorME(92), {
            align: 'left',
            width: factorME(63),
            height: factorME(15),
        })

    //horizontal line, actually by using rectangle
    doc.rect(factorME(113), factorME(107), factorME(97), factorME(1))
        .fillAndStroke('#FFCC00');

    //diploma name 1
    doc.font('fonts/cambriab.ttf')
        .fillColor('#C25757')
        .fontSize(factorME(5))
        .text('Bsc in Surveying Engineering', factorME(113), factorME(110), {
            align: 'left',
            width: factorME(77),
            height: factorME(6),
        })

    //diploma name 1 => year of completion
    doc.font('fonts/cambriab.ttf')
        .fillColor('#005DFF')
        .fontSize(factorME(4))
        .text('Year : 2022 GC', factorME(113), factorME(116), {
            align: 'left',
            width: factorME(40),
            height: factorME(5),
        })

    //diploma name 1 => CGPA
    doc.font('fonts/cambriab.ttf')
        .fillColor('#005DFF')
        .fontSize(factorME(4))
        .text('CGPA : 3.62', factorME(152), factorME(116), {
            align: 'right',
            width: factorME(37),
            height: factorME(5),
        })

    //diploma name 1 => Name of the College
    doc.font('fonts/cambriab.ttf')
        .fillColor('#005DFF')
        .fontSize(factorME(4))
        .text('Arbaminch University', factorME(113), factorME(121), {
            align: 'left',
            width: factorME(77),
            height: factorME(5),
        })


    //diploma name 2
    doc.font('fonts/cambriab.ttf')
        .fillColor('#C25757')
        .fontSize(factorME(5))
        .text('BA in Accounting', factorME(113), factorME(127), {
            align: 'left',
            width: factorME(77),
            height: factorME(6),
        })

    //diploma name 2 => year of completion
    doc.font('fonts/cambriab.ttf')
        .fillColor('#005DFF')
        .fontSize(factorME(4))
        .text('Year : 2021 GC', factorME(113), factorME(133), {
            align: 'left',
            width: factorME(40),
            height: factorME(5),
        })

    //diploma name 2 => CGPA
    doc.font('fonts/cambriab.ttf')
        .fillColor('#005DFF')
        .fontSize(factorME(4))
        .text('CGPA : 3.24', factorME(152), factorME(133), {
            align: 'right',
            width: factorME(37),
            height: factorME(5),
        })

    //diploma name 2 => Name of the College
    doc.font('fonts/cambriab.ttf')
        .fillColor('#005DFF')
        .fontSize(factorME(4))
        .text('Rift Valley University College', factorME(113), factorME(138), {
            align: 'left',
            width: factorME(77),
            height: factorME(5),
        })
}

function buildSkill(doc) {

    //applicant Skill => title
    doc.font('fonts/cambriab.ttf')
        .fillColor('#FFDD00')
        .fontSize(factorME(13))
        .text('Skill', factorME(113), factorME(145), {
            align: 'left',
            width: factorME(63),
            height: factorME(15),
        })


    //horizontal line, actually by using rectangle
    doc.rect(factorME(113), factorME(160), factorME(97), factorME(1))
        .fillAndStroke('#FFCC00');


    //applicant Skill => skill 1
    doc.font('fonts/cambriab.ttf')
        .fillColor('#FFDD00')
        .fontSize(factorME(5))
        .text('Name of the skill 1', factorME(113), factorME(163), {
            align: 'left',
            width: factorME(77),
            height: factorME(6),
        })

    //applicant Skill => skill 2
    doc.font('fonts/cambriab.ttf')
        .fillColor('#FFDD00')
        .fontSize(factorME(5))
        .text('Name of the skill 2', factorME(113), factorME(169), {
            align: 'left',
            width: factorME(77),
            height: factorME(6),
        })

    //applicant Skill => skill 3
    doc.font('fonts/cambriab.ttf')
        .fillColor('#FFDD00')
        .fontSize(factorME(5))
        .text('Name of the skill 3', factorME(113), factorME(175), {
            align: 'left',
            width: factorME(77),
            height: factorME(6),
        })

    //applicant Skill => skill 4
    doc.font('fonts/cambriab.ttf')
        .fillColor('#FFDD00')
        .fontSize(factorME(5))
        .text('Name of the skill 4', factorME(113), factorME(181), {
            align: 'left',
            width: factorME(77),
            height: factorME(6),
        })
}

function buildLanguage(doc) {

    //applicant langauge => title
    doc.font('fonts/cambriab.ttf')
        .fillColor('#FFDD00')
        .fontSize(factorME(13))
        .text('Languages', factorME(113), factorME(189), {
            align: 'left',
            width: factorME(63),
            height: factorME(15),
        })

    //horizontal line, actually by using rectangle
    doc.rect(factorME(113), factorME(204), factorME(97), factorME(1))
        .fillAndStroke('#FFCC00');


    //applicant language => langauge 1
    doc.font('fonts/cambriab.ttf')
        .fillColor('#FFDD00')
        .fontSize(factorME(5))
        .text('English', factorME(113), factorME(207), {
            align: 'left',
            width: factorME(77),
            height: factorME(6),
        })

    //applicant language => langauge 2
    doc.font('fonts/cambriab.ttf')
        .fillColor('#FFDD00')
        .fontSize(factorME(5))
        .text('Amharic', factorME(113), factorME(213), {
            align: 'left',
            width: factorME(77),
            height: factorME(6),
        })

    //applicant language => langauge 3
    doc.font('fonts/cambriab.ttf')
        .fillColor('#FFDD00')
        .fontSize(factorME(5))
        .text('Afan Oromo', factorME(113), factorME(219), {
            align: 'left',
            width: factorME(77),
            height: factorME(6),
        })

    //applicant language => langauge 4
    doc.font('fonts/cambriab.ttf')
        .fillColor('#FFDD00')
        .fontSize(factorME(5))
        .text('France', factorME(113), factorME(225), {
            align: 'left',
            width: factorME(77),
            height: factorME(6),
        })


}

function buildReference(doc) {

    //applicant Reference => title
    doc.font('fonts/cambriab.ttf')
        .fillColor('#FFDD00')
        .fontSize(factorME(13))
        .text('Reference', factorME(113), factorME(233), {
            align: 'left',
            width: factorME(63),
            height: factorME(15),
        })

    //horizontal line, actually by using rectangle
    doc.rect(factorME(113), factorME(248), factorME(97), factorME(1))
        .fillAndStroke('#FFCC00');


    //applicant reference => fullname
    doc.font('fonts/cambriab.ttf')
        .fillColor('#FFDD00')
        .fontSize(factorME(4))
        .text('Fullname', factorME(113), factorME(251), {
            align: 'left',
            width: factorME(49),
            height: factorME(6),
        })

    //applicant reference => phone no.
    doc.font('fonts/cambriab.ttf')
        .fillColor('#FFDD00')
        .fontSize(factorME(4))
        .text('Phone No.', factorME(162), factorME(251), {
            align: 'left',
            width: factorME(46),
            height: factorME(6),
        })

    //applicant reference => email
    doc.font('fonts/cambriab.ttf')
        .fillColor('#FFDD00')
        .fontSize(factorME(4))
        .text('Email Address', factorME(113), factorME(258), {
            align: 'left',
            width: factorME(49),
            height: factorME(6),
        })

    //applicant reference => city
    doc.font('fonts/cambriab.ttf')
        .fillColor('#FFDD00')
        .fontSize(factorME(4))
        .text('💎City', factorME(162), factorME(258), {
            align: 'left',
            width: factorME(49),
            height: factorME(6),
        })


}

function buildHobbies(doc) {

    //applicant Hobbies => title
    doc.font('fonts/cambriab.ttf')
        .fillColor('#FFDD00')
        .fontSize(factorME(13))
        .text('Hobbies', factorME(113), factorME(266), {
            align: 'left',
            width: factorME(63),
            height: factorME(15),
        })

    //horizontal line, actually by using rectangle
    doc.rect(factorME(113), factorME(281), factorME(97), factorME(1))
        .fillAndStroke('#FFCC00');

    //applicant reference => phone no.
    doc.font('fonts/cambriab.ttf')
        .fillColor('#FFDD00')
        .fontSize(factorME(4))
        .text('Playing Video Games, Meeting new people, Reading Books, Traveling and Hiking,', factorME(113), factorME(283), {
            align: 'left',
            width: factorME(97),
            height: factorME(14),
        })


}

module.exports.createCV = createCV;
const PDFDocument = require('pdfkit');
const fs = require('fs')

const factorME = require('./utility')

const renderBasicInformation = require('./basicInformation');
const renderBasicDesignes = require('./designes');
const renderExperience = require('./experience');
const renderEducation = require('./education.js');
const renderLanguage = require('./language.js');
const renderReference = require('./reference.js');
const renderHobbies = require('./hobby');

/**
 * @param theUser used as the reference for naming the pdf and fetching respective data from the db and then to render on the pdf.
 */

async function designCV(theUser) {
    // Create a document
    const doc = new PDFDocument({ size: 'A4', margin: 5,bufferPages: true });
    doc.pipe(fs.createWriteStream(`./pdfs/cv_${theUser.email}.pdf`));

    //the design is filled out with content one after another based on 
    //their z-index or stack

    // doc.on('pageAdded', (e) => {
    //     renderBasicDesignes(doc, false);
    // })

    const basicDesignedDoc = renderBasicDesignes(doc, true);
    const basicInformedDoc = await renderBasicInformation(basicDesignedDoc, theUser.email);
    const educationRenderedDoc = await renderEducation(basicInformedDoc, theUser._id);
    const languageRenderedDoc = await renderLanguage(educationRenderedDoc, theUser._id);
    const referenceRenderedDoc = await renderReference(languageRenderedDoc, theUser._id);
    const hobbiesRenderedDoc = await renderHobbies(referenceRenderedDoc, theUser._id);
    const experienceRenderedDoc = await renderExperience(hobbiesRenderedDoc, theUser._id);
    // const experienceRenderedDoc = await renderExperience(languageRenderedDoc, theUser._id);

    //inserting the profile picture on the first page
    //clipping about
    //clipping should be done at the last to make visible of the other document elements
    doc.switchToPage(doc.bufferedPageRange().start)

    //clipping
    doc.circle(factorME(23), factorME(23), factorME(23)).clip()

    //drawing background with white color
    doc.circle(factorME(23), factorME(23), factorME(23)).fill("#fff");

    //inserting image
    doc.image('C:\\Users\\Dere\\Downloads\\Dereje_3X4_photo-removebg.png', 0, 0, {
        fit: [factorME(46), factorME(46)]
    });


    //adding page no. or another to all pages we have
    // const range = doc.bufferedPageRange();
    //     // for (i = range.start, end = range.start + range.count, range.start <= end; i < end; i++) {
    //     //     doc.switchToPage(i);
    //     //     doc.text(`Page ${i + 1} of ${range.count}`);
    //     //         renderBasicDesignes(doc, false);
    //     // }

    experienceRenderedDoc.end();
    //doc.end();
}

module.exports = designCV;
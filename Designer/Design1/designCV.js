const PDFDocument = require('pdfkit');
const fs = require('fs')

const factorME = require('./utility')

//the basic information schema to get the pp image path
const pi_schema = require('../../models/personalInformation');

const renderBasicInformation = require('./basicInformation');
const renderBasicDesignes = require('./designes');
const renderExperience = require('./experience');
const renderEducation = require('./education.js');
const renderLanguage = require('./language.js');
const renderReference = require('./reference.js');
const renderHobbies = require('./hobby');
const personal_information = require("../../models/personalInformation");
const {ObjectId} = require("mongodb");

/**
 * @param theUser used as the reference for naming the pdf and fetching respective data from the db and then to render on the pdf.
 */

async function designCV(theUser) {
    // Create a document
    const docs = new PDFDocument({ size: 'A4', margin: 5,bufferPages: true });
    const pdfName=`./public/pdfs/cv_${theUser._id}.pdf`;
    const theFileWriteStream = fs.createWriteStream(pdfName);
    docs.pipe(theFileWriteStream);

    //the design is filled out with content one after another based on 
    //their z-index or stack

    // doc.on('pageAdded', (e) => {
    //     renderBasicDesignes(doc, false);
    // })

    const basicDesignedDoc = renderBasicDesignes(docs, true);
    const basicInformedDoc = await renderBasicInformation(basicDesignedDoc, theUser.email);
    const educationRenderedDoc = await renderEducation(basicInformedDoc, theUser._id);
    const languageRenderedDoc = await renderLanguage(educationRenderedDoc, theUser._id);
    const referenceRenderedDoc = await renderReference(languageRenderedDoc, theUser._id);
    const hobbiesRenderedDoc = await renderHobbies(referenceRenderedDoc, theUser._id);
    const experienceRenderedDoc = await renderExperience(hobbiesRenderedDoc, theUser._id);
    // const experienceRenderedDoc = await renderExperience(languageRenderedDoc, theUser._id);


    // adding page no. or another to all pages we have
    const range = experienceRenderedDoc.bufferedPageRange();
    for (i = range.start, end = range.start + range.count, range.start <= end; i < end; i++) {
        experienceRenderedDoc.switchToPage(i);
        experienceRenderedDoc
            .fillColor('black')
            .fontSize(factorME(4))
            .text(`Page ${i + 1} of ${range.count}`,
                factorME(95),
                factorME(290)
            );
        // renderBasicDesignes(experienceRenderedDoc, false);
    }


    //inserting the profile picture on the first page
    //clipping about
    //clipping should be done at the last to make visible of the other document elements
    experienceRenderedDoc.switchToPage(experienceRenderedDoc.bufferedPageRange().start)

    //clipping
    experienceRenderedDoc.circle(factorME(23), factorME(23), factorME(23)).clip()

    //drawing background with white color
    experienceRenderedDoc.circle(factorME(23), factorME(23), factorME(23)).fill("#fff");

    //inserting image

    try{
        email = theUser?.email;
        dbData = await personal_information.findOne({ email })
        theUserInfo = dbData ? dbData : {
            pp_image_path:'./images/male.jpg'
        }
        console.log(theUserInfo.pp_image_path);
        theUserInfo.pp_image_path = theUserInfo.pp_image_path?theUserInfo.pp_image_path: './images/male.jpg'
        experienceRenderedDoc.image(
            theUserInfo.pp_image_path?'./public/'+theUserInfo.pp_image_path:
                '/images/male.jpg', 0, 0,
            {
            fit: [factorME(46), factorME(46)]
        });
    }catch (e) {
        console.log('Error while inserting the pp image ', e)
        experienceRenderedDoc.image('./images/male.jpg', 0, 0, {
            fit: [factorME(46), factorME(46)]
        });

    }
    experienceRenderedDoc.end();

    return pdfName;
}

module.exports = designCV;
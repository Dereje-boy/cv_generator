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
    console.log("Designing the pdf with DESIGN 2");

    // Create a document
    const docs = new PDFDocument({ size: 'A4', margin: 10,bufferPages: true });
    const pdfName=`./public/pdfs/cv_${theUser._id}2.pdf`;
    const theFileWriteStream = fs.createWriteStream(pdfName);
    docs.pipe(theFileWriteStream);

    //the design is filled out with content one after another based on 
    //their z-index or stack

    // docs.on('pageAdded', (e) => {
    //     // renderBasicDesignes(docs, false);
    //     //left
    //     docs.rect(0, 0, factorME(67), factorME(297))
    //         // .fill('#E3D5C8');
    // })

    const basicDesignedDoc = renderBasicDesignes(docs, true);
    const basicInformedDoc = await renderBasicInformation(basicDesignedDoc, theUser.email);
    const referenceRendered = await renderReference(basicInformedDoc, theUser._id);
    const languageRendered = await renderLanguage(referenceRendered, theUser._id);
    const hobbyRendered = await renderHobbies(languageRendered, theUser._id);
    const educationRendered = await renderEducation(hobbyRendered, theUser._id);
    const experienceRenderedDoc = await renderExperience(educationRendered, theUser._id);

    // const hobbiesRenderedDoc = await renderHobbies(referenceRenderedDoc, theUser._id);
    // const experienceRenderedDoc = await renderExperience(hobbiesRenderedDoc, theUser._id);
    // const experienceRenderedDoc = await renderExperience(languageRenderedDoc, theUser._id);


    // adding page no. or another to all pages we have
    const range = experienceRenderedDoc.bufferedPageRange();
    for (i = range.start, end = range.start + range.count, range.start <= end; i < end; i++) {
        experienceRenderedDoc.switchToPage(i);
        experienceRenderedDoc
            .fillColor('black')
            .font('fonts/segoeui/segoeuib.ttf')
            .fontSize(factorME(4))
            .text(`Page ${i + 1} of ${range.count}`,
                factorME(200-experienceRenderedDoc.widthOfString("page 1 of 1")),
                factorME(287),
                {
                    align:'right'
                }
            );
        // renderBasicDesignes(experienceRenderedDoc, false);
    }


    //inserting the profile picture on the first page
    //clipping about
    //clipping should be done at the last to make visible of the other document elements
    experienceRenderedDoc.switchToPage(experienceRenderedDoc.bufferedPageRange().start)

    //clipping
    experienceRenderedDoc.circle(factorME(11+23), factorME(7+23), factorME(23)).clip()

    //drawing background with white color
    experienceRenderedDoc.circle(factorME(11+23), factorME(7+23), factorME(23)).fill("#fff");

    //inserting image

    try{
        email = theUser?.email;
        dbData = await personal_information.findOne({ email })
        theUserInfo = dbData ? dbData : {
            pp_image_path:'./images/male.jpg'
        }
        console.log(theUserInfo.pp_image_path);
        theUserInfo.pp_image_path = theUserInfo.pp_image_path.endsWith('undefined')?'./Images/male.jpg':'./public/'+theUserInfo.pp_image_path
        experienceRenderedDoc.image(theUserInfo.pp_image_path, factorME(11), factorME(7),
            {
            fit: [factorME(46), factorME(46)]
        });
    }catch (e) {
        console.log('Design 2: Error while inserting the pp image ', e)
        experienceRenderedDoc.image('./Images/male.jpg', 0, 0, {
            fit: [factorME(46), factorME(46)]
        });

    }

    experienceRenderedDoc.end();

    return pdfName;
}

module.exports = designCV;
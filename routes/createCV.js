const express = require('express')
const path = require('path')
const Router = express.Router();

const designCV = require('../Designer/Design1/designCV.js');
const design2CV = require('../Designer/Design2/designCV.js');

const B2 = require("backblaze-b2");
const fs = require("fs");

Router.get('/', async (req, res) => {

    let pdf_B2_path;
    let pdf2_B2_path;

    const pdfName = await designCV(res.theUser);
    console.log("the pdf name 1: ", pdfName.slice(8,pdfName.length));

    const pdfName2 = await design2CV(res.theUser);
    console.log("the pdf name 2: ", pdfName2.slice(8,pdfName2.length));

    try{

        const b2 = new B2({
            applicationKeyId: '0053fb7f01f1e6d0000000002', // or accountId: 'accountId'
            applicationKey: 'K005rcBFrawVI/hD+v5eCxce9CO4ovA' // or masterApplicationKey
        });

        const authorized = await b2.authorize();
        if (! authorized) throw new Error('Unable to get authorized, b2')

        const downloadAuthorization = await b2.getDownloadAuthorization({
            bucketId: 'a31f5b577f7061bf81ee061d',
            fileNamePrefix:'',
            validDurationInSeconds:60*60*24*6,
            b2ContentDisposition:'b2ContentDisposition'
        })
        if (! downloadAuthorization) throw new Error("Unable to get downloadAuthorization token")

        const authorizationToken = authorized.data.authorizationToken;
        const apiUrl = authorized.data.apiUrl;

        console.log("Authorization token :", authorizationToken, "\napiUrl", apiUrl);
        console.log('url: ', apiUrl+"/file/cv-generator/cv_65f9d22237540f1c49e99e20.pdf?Authorization="+authorizationToken)

        pdf_B2_path = apiUrl+"/file/cv-generator/cv_"+res.theUser._id+".pdf?Authorization="+authorizationToken;
        pdf2_B2_path = apiUrl+"/file/cv-generator/cv_"+res.theUser._id+"2.pdf?Authorization="+authorizationToken

        // console.log('uploadUrl: ', uploadUrl.data.uploadUrl);
        console.log('downloadAuthorization token : ', downloadAuthorization.data.authorizationToken);
        console.log("User ID ", res.theUser._id);
        console.log("Design 1 pdf name", pdfName);
        console.log('Design 2 pdf name', pdfName2)
        console.log('expected b2 file_url 1: ', pdf_B2_path);
        console.log('expected b2 file_url 2: ', pdf2_B2_path);


    }catch (e) {
        console.log("Error while generating downloadable link, in createCV route \n", e);
    }finally {
        res.render('createCV', {
            title: 'createCV',
            email: res.theUser.email,
            pdf_path:pdf_B2_path,
            pdf_path_2:pdf2_B2_path
        })
    }

    // res.sendFile(path.join(__dirname,"../",cvCreated.path))

})

Router.post('/',async (req,res)=>{
    //initiate the design from here
    // const cvCreated = await designCV(res.theUser);

    let response = {
        success:false,
        message:"not processed yet"
    }
    res.send('pdf created successfully')
    console.log('pdf creation ....')
})

module.exports = Router;
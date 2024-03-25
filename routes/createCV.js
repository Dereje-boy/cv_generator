const express = require('express')
const path = require('path')
const Router = express.Router();

const designCV = require('../Designer/Design1/designCV.js');
const design2CV = require('../Designer/Design2/designCV.js');

Router.get('/', async (req, res) => {

    // const pdfName = await designCV(res.theUser);
    const pdfName = await designCV(res.theUser);
    const pdfName2 = await design2CV(res.theUser);
    console.log("the pdf name 1: ", pdfName.slice(8,pdfName.length));
    console.log("the pdf name 2: ", pdfName2.slice(8,pdfName2.length));

    // res.sendFile(path.join(__dirname,"../",cvCreated.path))

    res.render('createCV', {
        title: 'createCV',
        email: res.theUser.email,
        pdf_path:pdfName.slice(8,pdfName.length),
        pdf_path_2:pdfName2.slice(8,pdfName2.length)
    })
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
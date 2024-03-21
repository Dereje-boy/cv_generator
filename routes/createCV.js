const express = require('express')
const path = require('path')
const Router = express.Router();

const designCV = require('../Designer/Design1/designCV.js');

Router.get('/', async (req, res) => {


    const pdfName = await designCV(res.theUser);
    console.log("the pdf name ", pdfName.slice(8,pdfName.length));

    // res.sendFile(path.join(__dirname,"../",cvCreated.path))

    res.render('createCV', {
        title: 'createCV',
        email: res.theUser.email,
        pdf_path:pdfName.slice(8,pdfName.length)
    })
})


Router.post('/',async (req,res)=>{
    //initiate the design from here
    const cvCreated = await designCV(res.theUser);

    let response = {
        success:false,
        message:"not processed yet"
    }
    res.send('pdf created successfully')
    console.log('pdf creation ....')
})

module.exports = Router;
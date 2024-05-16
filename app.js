const express = require('express');
const body_parser = require("body-parser")
const handlebars = require("express-handlebars").create({ defaultLayout: 'main' });
const multer = require('multer')
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const session = require('express-session');

const B2 = require('backblaze-b2');
const fs = require('fs')
const axios = require('axios');

//schema
const userSchema = require('./models/user');
//middlewares
const verifier = require('./middlewares/verify');


//Routes
const routerBasicInformation = require('./routes/basicInformation.js');
const experience = require('./routes/experience.js');
const education = require('./routes/education.js');
const languages = require('./routes/languages.js');
const reference = require('./routes/reference.js');
const hobbies = require('./routes/hobbies.js');
const login = require('./routes/login.js');
const signup = require('./routes/signup.JS');
const dashboard = require('./routes/dashboard.js');
const createCV = require('./routes/createCV.js');

//api, for rest full frontend
const api_basicInformation = require('./routes/api/api_basicInformation.js');
const api_education = require('./routes/api/api_education.js');
const api_experience = require('./routes/api/api_experience.js');

//check the user exist for the token we have on client side
const checkUserExist = require('./model/user/checkUserExist');
const { response } = require("express");

//instantiating mongo
// Connect to MongoDB database

//Remote free mongodb user:derejeg35, password:bReyqHBmMpMNnd9a
// mongoose.connect('mongodb+srv://derejeg35:bReyqHBmMpMNnd9a@cluster1.s56m4bq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1').
//     then(success => {
//         //console.log(success);
//     }).
//     catch(e => {
//         console.log('Failed to connect to MongoDB',e);
//     });

//localdb = mongodb://localhost:27017/cvGenerator
mongoose.connect('mongodb://localhost:27017/cvGenerator')
    .then(success => {
        //console.log(success);
    }).
    catch(e => {
        console.log('Failed to connect to MongoDB', e);
    });

mongoose.connection.on('connected', async () => {
    console.log("Mongo DB connected successfully")

    //console.log(userSchema);
    const newUser = new userSchema({
        email: "newUser@gmail.com"
    });

    console.log('\n=== Inserting new user =====');
    try {
        const insertResult = await newUser.save();
        console.log(insertResult);
    } catch (e) {
        console.log('\n====== Error =====\n', e._message, '\n===== Error ====\n')
    }

    try {
        const findResult = await userSchema.find();
        console.log('\n==== Searching for all existing documents ======')
        console.log(findResult.length);
        console.log('==== Searching for all existing documents ======\n')
    } catch (e) {
        console.log('====== Error =====\n', e._message, '\n===== Error ====\n\n')
    }

})

const app = express();

app.engine('handlebars', handlebars.engine)
app.set('view engine', "handlebars")
app.use(express.static(__dirname + "/public"))
app.use(body_parser({ extended: true }))
app.use(cookieParser())
app.use(session({
    secret: 'your-secret-key', // Change this to a random string
    resave: false,
    saveUninitialized: true
}));

//============Routing
app.use('/basicInformation', verifier, routerBasicInformation);
app.use('/experience', verifier, experience);
app.use('/education', verifier, education);
app.use('/languages', verifier, languages);
app.use('/reference', verifier, reference);
app.use('/hobbies', verifier, hobbies);
app.use('/dashboard', verifier, dashboard);
app.use('/createCv', verifier, createCV);
app.use('/login', login);
app.use('/signup', signup);

//============API -- Routing
app.use('/api/basicInformation', api_basicInformation);
app.use('/api/education', api_education);
app.use('/api/experience', api_experience);

//homepage
app.get("/", (req, res) => { //1. first check if the right cookie available
    const token = req.cookies.token;
    // console.log(token);

    email = '';

    //check to cookie
    if (token) {
        jwt.verify(token, 'my-secret-key', async (error, theUser) => {
            //unable to verify the cookie so render login page
            if (error)
                return res.render("index", { email, title: "CV GENERATOR" });

            //checking the user with verified email address exist
            const userExist = checkUserExist.check(theUser.email).then(userExist => {
                //if it exist it send us email and _id of the user
                // console.log('checking the user exist ? ', userExist)

                email = userExist != null ?
                    userExist.email : ""
                res.render("index", { email, title: "CV GENERATOR" });

            }).catch(e => {
                res.render("index", { email, title: "CV GENERATOR" });
            })
        })
    } else {
        res.render("index", { email, title: "CV GENERATOR" });
    }
})

app.get('/blogs', (req, res) => {
    res.render('blogs');
})

app.get('/b2', async (req, res) => {
    // const b2 = new B2({
    //     accountID:'0053fb7f01f1e6d0000000001',
    //     applicationKey:'K005vWj05UcmB6OlYEOMebd6BqAGtuo'
    // })

    res.send('welcome to b2')

    const b2 = new B2({
        applicationKeyId: '0053fb7f01f1e6d0000000002', // or accountId: 'accountId'
        applicationKey: 'K005rcBFrawVI/hD+v5eCxce9CO4ovA' // or masterApplicationKey
    });

    // GetBucket(b2,res)
    uploadFile(b2, res)

    /*
    try{
        await b2.authorize();
        b2.listFileNames({
            bucketId: 'a31f5b577f7061bf81ee061d',
            maxFileCount: 100 // Adjust as needed
        }).then(response => {
            response.data.files.forEach(async thisFile=>{
                console.log('Files in bucket:',  thisFile.fileName);
                await downloadFile(b2,  thisFile.fileName)
                })
        }).catch(err => {
            console.error('Error listing files:', err);
        });

        // const files = await b2.listFileNames({
        //     bucketId: 'a31f5b577f7061bf81ee061d',
        //     maxFileCount: 100,
        //     delimiter: ',',
        //     prefix: ''
        //     // ...common arguments (optional)
        // });
        // console.log(files)
    }catch (e) {
        console.log('Error while getting all files in the bucket,\n', e)
    }
    */


})

async function downloadFile(b2, filename) {
    console.log(filename)
    try {
        const response = await b2.downloadFileByName({
            bucketName: 'cv-generator',
            fileName: filename,
        })
        // Assuming response.data is a Buffer
        const fileContent = response.data;
        // Define content type for PDF
        const contentType = 'application/pdf';
        // You can save the PDF file locally or do other operations with it
        fs.writeFileSync(filename + '.pdf', fileContent);
        console.log('PDF file downloaded successfully');

    } catch (e) {
        console.log('unable to download a file', e)
    }

    // b2.downloadFileByName({
    //     filename:filename,
    //     bucketName:'cv-generator'
    // }).then(response=>{
    //     console.log("File name: ",filename)
    //     console.log("File data: ",response.data)
    // }).catch(error=>{
    //     console.error('Error downloading file:', err);
    // })
}

async function GetBucket(b2, res) {
    b2.authorize().then(async () => {
        console.log('authorized')
        // res.send('Authorized...')
        try {
            let response = await b2.getBucket({ bucketName: 'cv-generator' });
            console.log(response.data);
            res.send('working..')
        } catch (err) {
            console.log('Error getting bucket:', err);
            res.send('Error getting bucket:', err)
        }
    }
    ).catch(err => {
        console.log('unauthorized ', err)
        res.send('unauthorized ', err)
    })
}

async function uploadFile(b2, res) {

    b2.authorize().then(() => {
        console.log('authorized, Now uploading file...')

        b2.getUploadUrl({
            bucketId: 'a31f5b577f7061bf81ee061d'
        }).then(response => {
            console.log('uploadUrl: ', response.data.uploadUrl);
            console.log('authorizationToken: ', response.data.authorizationToken);

            fileId = '4_za31f5b577f7061bf81ee061d_f1023e422ba581b96_d20240327_m055251_c005_v0501017_t0013_u01711518771769';
            generateTemporaryUrl(fileId, '0053fb7f01f1e6d0000000002', 'K005rcBFrawVI/hD+v5eCxce9CO4ovA');


            // b2.uploadFile({
            //     filename:'cv_derejeg35@gmail.com.pdf',
            //     data:fs.readFileSync('cv_derejeg35@gmail.com.pdf'),
            //     contentType:'application/pdf',
            //     bucketName:'cv-generator',
            //     uploadUrl:response.data.uploadUrl,
            //     headers:{
            //         'content-type':'application/pdf'
            //     },
            //     uploadAuthToken:response.data.authorizationToken
            // }).then(response => {
            //     console.log('File uploaded successfully:', response.data);
            //     const fileId = response.data.fileId;
            //     generateTemporaryUrl(fileId,'0053fb7f01f1e6d0000000002','K005rcBFrawVI/hD+v5eCxce9CO4ovA' )
            //
            // }).catch(err => {
            //     console.error('Upload failed:', err);
            // });
        }).catch(e => {
            console.log("unable to get upload url", e);
        })
    }).catch(e => {
        console.log('unauthorized, Unable to upload file....')
    })
    /*
    // upload file
    await b2.uploadFile({
        uploadUrl: 'uploadUrl',
        uploadAuthToken: 'uploadAuthToken',
        fileName: 'fileName',
        data: 'data', // this is expecting a Buffer, not an encoded string,
        onUploadProgress: (event) => {
            console.log('event coming')
        }// || null // progress monitoring
        });  // returns promise
    */
}

const generateTemporaryUrl = async (fileId, accountId, applicationKey) => {
    console.log('== Generating Application Ke ==');
    try {
        // Authenticate with Backblaze B2

        const b2 = new B2({
            applicationKeyId: '0053fb7f01f1e6d0000000002', // or accountId: 'accountId'
            applicationKey: 'K005rcBFrawVI/hD+v5eCxce9CO4ovA' // or masterApplicationKey
        });

        b2.authorize().then(async authorized => {
            console.log('Authorize response: ', authorized ? true : false);
            const authorizationToken = authorized.data.authorizationToken;
            const apiUrl = authorized.data.apiUrl;

            console.log("Authorization token :", authorizationToken, "\napiUrl", apiUrl);
            console.log('url: ', apiUrl + "/file/cv-generator/cv_65f9d22237540f1c49e99e20.pdf?Authorization=" + authorizationToken)

            // b2.getDownloadAuthorization({
            //     bucketId: 'a31f5b577f7061bf81ee061d',
            //     fileNamePrefix:'',
            //     validDurationInSeconds:60*60*24*6,
            //     b2ContentDisposition:'b2ContentDisposition'
            // }).then(temporaryUrlResponse=>{
            //
            //     const temporaryUrl = temporaryUrlResponse.data.downloadAuthorization;
            //
            //     console.log('Temporary URL:', temporaryUrlResponse);
            //     return temporaryUrl;
            // }).catch(e=>{
            //     console.log('Unable to get Download Authorization', e);
            // })

            axios.post(apiUrl + '/b2api/v2/b2_get_download_authorization', {
                bucketId: 'a31f5b577f7061bf81ee061d',
                validDurationInSeconds: 60 * 60 * 24 * 6, // Set the validity duration (in seconds) for the temporary URL
                fileNamePrefix: ''
            }, {
                headers: {
                    Authorization: authorizationToken
                }
            }).then(temporaryUrlResponse => {
                console.log(temporaryUrlResponse);
            }).catch(e => {
                console.log('Unable to get temporaryUrlResponse\n', e);
            })

        }).catch(e => {
            console.log('Un authorized: ', e)
        })

        // const response = await axios.post('https://api.backblazeb2.com/b2api/v2/b2_authorize_account', {
        //     accountId: accountId,
        //     applicationKey: applicationKey
        // });
        // const authToken = response.data.authorizationToken;
        // const apiUrl = response.data.apiUrl;

        // Generate temporary URL for file download
        // const temporaryUrlResponse = await axios.post(apiUrl + '/b2api/v2/b2_get_download_authorization', {
        //     fileId: fileId,
        //     validDurationInSeconds: 3600 // Set the validity duration (in seconds) for the temporary URL
        // }, {
        //     headers: {
        //         Authorization: authToken
        //     }
        // });
        // const temporaryUrl = temporaryUrlResponse.data.downloadAuthorization;
        //
        // console.log('Temporary URL:', temporaryUrl);
        // return temporaryUrl;
    } catch (error) {
        // console.error('Error:', error);
    }
};

function createCV1() {
    // Create a document
    const doc = new PDFDocument({ size: 'A4' });

    doc.pipe(fs.createWriteStream('cv.pdf'));

    doc
        .font('fonts/PalatinoBold.ttf')
        .fontSize(factorME(15))
        .text('Dereje Gezahegn', 48, 4);

    doc.image('C:\\Users\\Dere\\Downloads\\Dereje_3X4_photo-removebg.png', {
        fit: [factorME(45), factorME(45)]
    });

    doc.image('images\\210x91.png', {
        fit: [factorME(210), factorME(91)]
    });
    // Finalize PDF file
    doc.end();
    // res.send("done");
}

function pdfCreator(res) {

    // Create a document
    const doc = new PDFDocument();

    // Pipe its output somewhere, like to a file or HTTP response
    // See below for browser usage
    // doc.pipe(fs.createWriteStream('output.pdf'));//local file
    doc.pipe(res);

    // Embed a font, set the font size, and render some text
    doc
        .font('fonts/PalatinoBold.ttf')
        .fontSize(25)
        .text('Some text with an embedded font!', 100, 100);

    // Add an image, constrain it to a given size, and center it vertically and horizontally
    doc.image('C:\\Users\\Dere\\Downloads\\Dereje_3X4_photo-removebg.png', {
        fit: [250, 300],
        align: 'center',
        valign: 'center'
    });

    // Add another page
    doc
        .addPage()
        .fontSize(25)
        .text('Here is some vector graphics...', 100, 100);

    // Draw a triangle
    doc
        .save()
        .moveTo(100, 150)
        .lineTo(100, 250)
        .lineTo(200, 250)
        .fill('#FF3300');

    // Apply some transforms and render an SVG path with the 'even-odd' fill rule
    doc
        .scale(0.6)
        .translate(470, -380)
        .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
        .fill('red', 'even-odd')
        .restore();

    // Add some text with annotations
    doc
        .addPage()
        .fillColor('blue')
        .text('Here is a link!', 100, 100)
        .underline(100, 100, 160, 27, { color: '#0000FF' })
        .link(100, 100, 160, 27, 'http://google.com/');

    // Finalize PDF file
    doc.end();
}

app.listen(3000, () => console.log("The server started running on port 3000"))
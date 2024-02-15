const express = require('express');
const body_parser = require("body-parser")
const handlebars = require("express-handlebars").create({ defaultLayout: 'main' });
const { MongoClient } = require("mongodb")

//Routes
const routerBasicInformation = require('./routes/basicInformation');
const experience = require('./routes/experience');
const education = require('./routes/education');
const languages = require('./routes/languages');
const reference = require('./routes/reference');
const hobbies = require('./routes/hobbies');

const app = express();

app.engine('handlebars', handlebars.engine)
app.set('view engine', "handlebars")
app.use(express.static(__dirname + "/public"))
app.use(body_parser())
const tsayishDoc = { firstname: "Tsayish", lastname: "Gezahegn", phoneNumber: "+28589347834", email: "tsayishGezahegn@gmail.com", aboutMe: "Purchaser at hacikon company" };

//Routing
app.use('/basicInformation', routerBasicInformation);
app.use('/experience', experience);
app.use('/education', education);
app.use('/languages', languages);
app.use('/reference', reference);
app.use('/hobbies', hobbies);

app.get("/", (req, res) => {
    res.render("index");
})
app.get("/updated", (req, res) => {
})

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

createConnection()

async function createConnection() {
    const client = new MongoClient('mongodb://localhost:27017');
    const connection = await client.connect();
    const cvGeneratorDB = connection.db('cvGenerator');
    const usersCollection = cvGeneratorDB.collection('users');
    // await cvGeneratorDB.collection('user').drop();
    // deleting collection which doesnot exist, raises an error
    const myDoc = { firstname: "Brad", lastname: "Travirsia", phoneNumber: "09898934894", email: "ghioege@gmail.com", aboutMe: "ghieg eiogjeiogj iej geigje iigje gengei gieng ern" };
    // const insertResult = await usersCollection.insertOne(myDoc);
    return connection;
}

app.listen(3000, () => console.log("The server started running on port 3k"))
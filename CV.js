const PDFDocument = require('pdfkit');


const create = () => {


    const doc = new PDFDocument();
    doc.pipe(res);


    return "I am creating a cv";

}

module.exports.create = create;
const factorME = require('./utility');

function renderBasicDesignes(doc, first) {
    console.log('rendering basic Designes');

    //left
    doc.rect(0, 0, factorME(3), factorME(297))
        .fill('#391111');

    if (first)
        //top
        doc.rect(0, 0, factorME(210), factorME(91))
            .fill('#391111');


    return doc
}

module.exports = renderBasicDesignes;
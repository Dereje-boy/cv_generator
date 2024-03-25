const factorME = require('./utility');

function renderBasicDesignes(doc, first) {
    console.log('rendering basic Designs 2');

    //left
    doc.rect(0, 0, factorME(67), factorME(297))
        .fill('#E3D5C8');

    if (first)
    //right top
    doc.rect(factorME(67), 0, factorME(143), factorME(49))
        .fill('#343537');


    return doc
}

module.exports = renderBasicDesignes;
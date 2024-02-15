const express = require('express');
const { MongoClient } = require("mongodb")


const router = express.Router();

router.get('', (req, res) => {
    console.log(req.params.data);
    res.render("experience", { message: req.params.data });
})
router.post('', async (req, res) => {

    const { position, startDate, stillHere, companyName, aboutExperience } = req.body;
    let { endDate } = req.body;

    //typeof stillHere is either string with 'on' or undefined type
    if (typeof stillHere == typeof "") endDate = undefined;

    console.log({ position, startDate, endDate, stillHere, companyName, aboutExperience });

    const client = new MongoClient('mongodb://localhost:27017');
    const connection = await client.connect();
    const cvGeneratorDB = connection.db('cvGenerator');
    const usersCollection = cvGeneratorDB.collection('users');

    const insertResult = await usersCollection.insertOne({
        position,
        startDate,
        endDate,
        companyName,
        aboutExperience
    });
    const successMessage = "Experience Added Successfully";
    const unsuccessMessage = "Adding Experience Unsuccessfull, Please try Again.";
    const message = insertResult.acknowledged ? successMessage : unsuccessMessage;
    console.log(message);
    // req.user = 'my user';
    // res.redirect(`/experience/${message}`);
    res.render('experience', { message })

})

module.exports = router;
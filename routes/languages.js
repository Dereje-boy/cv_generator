const express = require('express')
const Router = express.Router();

//languages schema
const schema = require('../models/language');

const levelEnum = ['native', 'fluent', 'advanced', 'beginner'];

Router.get('/', async (req, res) => {
    try {
        const allLanguages = await schema.find({ user_id: res.theUser._id });
        //console.log('all languages', allLanguages)
        let thisUserLanguages = []

        for (let i = 0; i < allLanguages.length; i++) {
            let language = {
                language: allLanguages[i].language,
                level: allLanguages[i].level[0],
                id: allLanguages[i]._id.toString()
            }
            thisUserLanguages.push(language);
        }

        //console.log('this user langauges', thisUserLanguages)

        return res.render('languages', { title: "CV Gen.. | Language", message: req.session.message, email: res.theUser.email, thisUserLanguages });

    } catch (error) {
        console.log(error)
        return res.render('languages', { title: "CV Gen.. | Language", message: req.session.message, email: res.theUser.email });
    } finally {
        delete req.session.message;
    }
})

Router.delete('/', async (req, res) => {
    schema.deleteOne({ _id: req.body.id }).then(deleteResult => {
        // if(deleteResult.deleteCount)
        console.log(deleteResult);
        res.send({ deleted: true, reason: null })
    }).catch(error => {
        console.log(error)
        res.send({ deleted: false, reason: error })
    })
})

Router.post('/', async (req, res) => {

    const { language, level } = req.body;
    let isLevelEnum = false;

    levelEnum.forEach(value => {
        isLevelEnum = value === level.toLowerCase() ? value : false;
        if (isLevelEnum) {
            //console.log(isLevelEnum);
            saveLanguage(language, level, res, req)
            return;
        }
    })

    console.log(req.body);
})

function saveLanguage(language, level, res, req) {
    thisLanguage = new schema({
        language,
        level,
        user_id: res.theUser._id
    })
    thisLanguage.save().
        then(insertResult => {
            req.session.message = "Langauage inserted successfully";

        }).catch(e => {
            req.session.message = `The Language is not inserted \n ${e}`;

        }).finally(() => {
            res.redirect('/languages')
        })
}

module.exports = Router;
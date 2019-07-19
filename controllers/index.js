const express = require('express')
const router = express.Router()
const Article = require('../models/article')


//routes 

router.get('/', function(req, res) {
    Article
        .find({}) //find all 
        .where('saved').equals(false)
        .sort('-date')
        .limit(20)
        .exec(function(err, articles) {
            if (err) {
                console.log(`${error},  *** root route broken ***`)
            } else {
                let titlecardObject = {
                    title: 'Hacker news',
                    subtitle: 'Saved',
                    articles: articles
                }
                res.render('saved', titlecardObject)
            }
        })
})
router.use('/api', require('./api')) //needed for controllers



module.exports = router

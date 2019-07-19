const express = require('express')
const router = express.router()
const request = require ('request') //easier https calls
const cheerio = require ('cheerio')
const Article = require('../../models/article')


//Database routing

//Scrape articles
router.get('/scrape', function(req, res, again) {
    request('https://news.ycombinator.com', function(error, response, html) {
        let $ = cheerio.load(html)
        $('tr.athing td.title').each(function(i, e) {
            let title = $(this).children('a').text(),
                link = $(this).children('a').attr('href'),
                single = {}

            if (link !== undefined && link.includes('http') &&  title !== '') { //fix for alt format
                single = {
                    title: title,
                    link: link
                }

                let entry = new Article(single)

                // save to mongo
                entry.save(function(err, data) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log('new article saved');
                    }
                })
            }
        })
        again()
    })
}, function(req, res) {
    res.redirect('/')
})

// post route for articles
router.post('/save/:id',function(req, res) {
    Article.findByIdAndUpdate(req.params.id, {
        $set: {saved: true}
    })
})

// Get route for every article in db
router.get('/', function(req, res) {
    Article
        .find({})
        .exec(function(error, data) {
            if (error) {
                console.log(error)
            } else {
                res.status(200).json(data)
            }
        })
})

// get route for all the saved articles in db
router.get('/saved', function(req, res) {
    Article
        .find({})
        .where('saved').equals(true)
        .where('deleted').equals(false)
        .populate('notes')
        .exec(function(error, data) {
            if (error) {
                console.log(error)
            } else {
                res.status(200).json(data)
            }
        })
})

// delete a scraped article
router.delete('/dismiss/:id', function(req, res) {
    Article.findByIdAndUpdate(req.params.id,
        { $set: { deleted: true } },
        { new: true },
        function(error, res) {
            if (error) {
                console.log(error)
            } else {
                res.redirect('/')
            }
        })
})

// delete a saved article
router.delete('/:id', function(req, res) {
    Article.findByIdAndUpdate(req.params.id,
        { $set: { deleted: true} },
        { new: true },
        function(error, data) {
            if (error) {
                console.log(error)
                res.status(500)
            } else {
                res.redirect('/saved')
            }
        }
    )
})

// get route for all deleted articles in db
router.get('/deleted', function(req, res) {
    Article
        .find({})
        .where('deleted').equals(true)
        .exec(function(error, data) {
            if (error) {
                console.log(error)
            } else {
                res.status(200).json(data);
            }
        })
})

module.exports = router;
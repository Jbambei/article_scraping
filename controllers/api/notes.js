const express = require('express'),
      router = express.Router(),
      Article = require('../../models/article'),
      Note = require('../../models/note')


// get all notes
router.get('/', function(req, res) {
    Note
        .find({})
        .exec(function(err, data) {
            if (err) {
                console.log(err)
            } else {
                res.status(200).json(data)
            }
        })
})

// Adds a note to a previously saved article
router.post('/:id', function(req, res) {
    let newNote = new Note(req.body)
    newNote.save(function(err, data) {
        if (err) {
            console.log(err)
            res.status(500)
        } else {
            Article.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { 'notes': data.id } },
                function(error, newData) {
                    if (error) {
                        console.log(error)
                        res.status(500)
                    } else {
                        res.redirect('/saved')
                    }
                }
            )
        }
    })
})

// Deletes a note from a previously saved article
router.delete('/:id', function(req, res) {
    Note.findByIdAndRemove(req.params.id, function(err, data) {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/saved')
        }
    })
})

module.exports = router
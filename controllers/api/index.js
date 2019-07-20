const express = require('express')
const router = express.Router()

router.get('/', function(req, res) {
    res.status(200).send('<a href=\'/api/articles/\'>articles</a><br><a href=\'/api/notes/\'>notes</a>') //may break? NOt sure if 200 is validated or not
});

router.use('/articles', require('./articles'));
router.use('/notes', require('./notes'));

module.exports = router;
var ratingController = require('../controllers/ratingController')
var objratingController = new ratingController()
var express = require('express');
var router = express.Router();
var validator = require('../middleware/validator');
var authorize = require('../middleware/authorization');

/* Insert and Update rating */
router.post('/', validator.ratingValidator(), authorize.authorization, async(req, res) => {
    try{
        const errors = validator.resultsValidator(req)
        if (errors.length > 0) {
            return res.status(400).json({
                method: req.method,
                status: res.statusCode,
                error: errors
            })
        }
        
        var result = (await objratingController.create_rating(
            req.user.user_id,
            req.body.book_id, 
            req.body.rating
        ))
        res.json(result);
        res.end();
    }catch(err){
        res.status(err.status).json({
            message: err.message
        })
        res.end();
    }
});

module.exports = router;

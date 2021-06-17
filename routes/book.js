var bookController = require('../controllers/bookController')
var objBookController = new bookController()
var express = require('express');
var router = express.Router();
var validator = require('../middleware/validator');
var authorize = require('../middleware/authorization');

/* GET สินค้าทั้งหมด */
router.get('/', async(req, res) => {
    try{
        var result = (await objBookController.get_book_all())
        res.json(result);
        res.end();
    }catch(err){
        res.status(err.status).json({
            message: err.message
        })
        res.end();
    }
});
/* GET สินค้าใหม่ */
router.get('/new', async(req, res) => {
    try{
        var result = (await objBookController.get_book_new())
        res.json(result);
        res.end();
    }catch(err){
        res.status(err.status).json({
            message: err.message
        })
        res.end();
    }
    res.end();
});
/* GET สินค้าขายดี */
router.get('/best_seller', async(req, res) => {
    try{
        var result = (await objBookController.get_book_best_seller())
        res.json(result);
        res.end();
    }catch(err){
        res.status(err.status).json({
            message: err.message
        })
        res.end();
    }
    res.end();
});
/* GET สินค้าลดราคา */
router.get('/on_sale', async(req, res) => {
    try{
        var result = (await objBookController.get_book_on_sale())
        res.json(result);
        res.end();
    }catch(err){
        res.status(err.status).json({
            message: err.message
        })
        res.end();
    }
    res.end();
});
/* GET สินค้าแนะนำ */
router.get('/recommend', async(req, res) => {
    try{
        var result = (await objBookController.get_book_recommend())
        res.json(result);
        res.end();
    }catch(err){
        res.status(err.status).json({
            message: err.message
        })
        res.end();
    }
    res.end();
});


/* GET book in store by user id */
router.get('/store', authorize.authorization, async(req, res) => {
    try{
        var result = (await objBookController.get_book_store(
            req.user.user_id
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

/* GET book by book id */
router.get('/:book_id', authorize.decode, async(req, res) => {
    try{
        var result = (await objBookController.get_book_ById(
            req.params.book_id,
            req.user.user_id
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

/* Insert book */
router.post('/', validator.bookValidator(), authorize.authorization, async(req, res) => {
    try{
        const errors = validator.resultsValidator(req)
        if (errors.length > 0) {
            return res.status(400).json({
                method: req.method,
                status: res.statusCode,
                error: errors
            })
        }
        
        var result = (await objBookController.create_book(
            req.body.book_name, 
            req.body.book_desc, 
            req.body.unit_price, 
            req.body.discount, 
            req.user.user_id
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

/* Update book by id */
router.patch('/:book_id', validator.updateBookValidator(), authorize.authorization, async(req, res) => {
    try{
        const errors = validator.resultsValidator(req)
        if (errors.length > 0) {
            return res.status(400).json({
                method: req.method,
                status: res.statusCode,
                error: errors
            })
        }

        var result = (await objBookController.update_book(
            req.user.user_id,
            req.params.book_id,
            req.body.book_name, 
            req.body.book_desc, 
            req.body.unit_price
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

/* Delete book by id */
router.delete('/:book_id', validator.deleteBookValidator(), authorize.authorization, async(req, res) => {
    try{
        const errors = validator.resultsValidator(req)
        if (errors.length > 0) {
            return res.status(400).json({
                method: req.method,
                status: res.statusCode,
                error: errors
            })
        }
        var result = (await objBookController.delete_book(
            req.user.user_id,
            req.params.book_id
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

/* Disable book by id */
router.patch('/:book_id/disable/:status', authorize.authorization, async(req, res) => {
    try{  
        const errors = validator.resultsValidator(req)
        if (errors.length > 0) {
            return res.status(400).json({
                method: req.method,
                status: res.statusCode,
                error: errors
            })
        }
        var result = (await objBookController.disable_book(
            req.user.user_id,
            req.params.book_id,
            req.params.status
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

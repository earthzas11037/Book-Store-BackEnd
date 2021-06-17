var shoppingCartController = require('../controllers/shoppingCartController')
var objShoppingCartController = new shoppingCartController()
var express = require('express');
var router = express.Router();
var validator = require('../middleware/validator');
var authorize = require('../middleware/authorization');

/* Get cart */
router.get('/', authorize.authorization, async(req, res) => {
    try{
        var result = (await objShoppingCartController.get_shoppingCart_ByUserId(
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

/* Insert and Update cart*/
router.post('/', validator.shoppingCartValidator(), authorize.authorization, async(req, res) => {
    try{
        const errors = validator.resultsValidator(req)
        if (errors.length > 0) {
            return res.status(400).json({
                method: req.method,
                status: res.statusCode,
                error: errors
            })
        }

        var result = (await objShoppingCartController.create_shoppingCart(
            req.user.user_id,
            req.body.book_id,
            req.body.quantity
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

/* Insert and Update cart */
router.patch('/', validator.shoppingCartValidator(), authorize.authorization, async(req, res) => {
    try{
        const errors = validator.resultsValidator(req)
        if (errors.length > 0) {
            return res.status(400).json({
                method: req.method,
                status: res.statusCode,
                error: errors
            })
        }

        var result = (await objShoppingCartController.update_shoppingCart(
            req.user.user_id,
            req.body.book_id,
            req.body.quantity
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

/* Delete item in cart */
router.delete('/:book_id', authorize.authorization, async(req, res) => {
    try{
        const errors = validator.resultsValidator(req)
        if (errors.length > 0) {
            return res.status(400).json({
                method: req.method,
                status: res.statusCode,
                error: errors
            })
        }

        var result = (await objShoppingCartController.delete_shoppingCart(
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

module.exports = router;

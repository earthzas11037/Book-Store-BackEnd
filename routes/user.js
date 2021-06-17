var userController = require('../controllers/userController')
var objUserController = new userController()
var express = require('express');
var router = express.Router();
var validator = require('../middleware/validator');
var authorize = require('../middleware/authorization');

/* GET current information user */
router.get('/current', authorize.authorization, async(req, res) => {
    try{
        var result = (await objUserController.current_user(
            req.user.user_id,
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

/* GET all user */
// router.get('/', async(req, res) => {
//     res.json();
//     res.end();
// });

/* GET user by id */
// router.get('/:user_id', async(req, res) => {
//     res.json();
//     res.end();
// });

/* Insert user */
router.post('/', validator.createUserValidator() ,async(req, res) => {
    try{
        const errors = validator.resultsValidator(req)
        if (errors.length > 0) {
            return res.status(400).json({
                method: req.method,
                status: res.statusCode,
                error: errors
            })
        }
        
        var result = (await objUserController.create_user(
            req.body.user_name,
            req.body.email,
            req.body.password
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

/* Login */
router.post('/login', validator.loginValidator() , async(req, res) => {
    try{ 
        const errors = validator.resultsValidator(req)
        if (errors.length > 0) {
            return res.status(400).json({
                method: req.method,
                status: res.statusCode,
                error: errors
            })
        }
        
        var result = (await objUserController.login(
            req.body.email,
            req.body.password
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

/* Update user by id */
// router.patch('/:user_id', async(req, res) => {
//         res.json();
//         res.end();
// });


module.exports = router;

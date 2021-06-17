const { check, validationResult } = require('express-validator');

exports.resultsValidator = (req) => {
    const messages = []
    if (!validationResult(req).isEmpty()) {
      const errors = validationResult(req).array()
      for (const i of errors) {
        messages.push(i)
      }
    }
    return messages
}

exports.createUserValidator = () => {
    return [
        check('user_name').notEmpty(),
        check('email').isEmail(),
        check('password').isLength({ min: 8 })
    ]
}

exports.loginValidator = () => {
    return [
        check('email').isEmail(),
        check('password').isLength({ min: 8 })
    ]
}

exports.bookValidator = () => {
    return [
        check('book_name').notEmpty(),
        check('book_desc').notEmpty(),
        check('unit_price').notEmpty(),
        check('discount').notEmpty()
    ]
}

exports.updateBookValidator = () => {
    return [
        check('book_name').notEmpty(),
        check('book_desc').notEmpty(),
        check('unit_price').notEmpty()
    ]
}

exports.deleteBookValidator = () => {
    return [
        check('book_id').notEmpty(),
    ]
}

exports.ratingValidator = () => {
    return [
        check('book_id').notEmpty(),
        check('rating').notEmpty(),
    ]
}

exports.shoppingCartValidator = () => {
    return [
        check('book_id').notEmpty(),
        check('quantity').notEmpty(),
    ]
}

exports.deleteShoppingCartValidator = () => {
    return [
        check('book_id').notEmpty(),
    ]
}
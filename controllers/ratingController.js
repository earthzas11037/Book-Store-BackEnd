var ratingModel = require('../models/ratingModel')
var objRatingModel = new ratingModel()
var bookModel = require('../models/bookModel')
var objBookModel = new bookModel()

class ratingController {

    async create_rating(user_id, book_id, rating) {
        var result = (await objBookModel.getById(book_id))
        if(result[0]){
            if(result[0].owner_id === user_id) 
                throw { status:401, message: "Unauthorized"}
        }else{
            throw { status:404, message: "Not Found"}
        }

        var result_check = (await objRatingModel.getById(user_id, book_id))
        if(result_check[0]){
            return []
        }else{
            var result = (await objRatingModel.create(user_id, book_id, rating))
        }
        return result
    }

}

module.exports = ratingController
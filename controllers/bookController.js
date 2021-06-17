var bookModel = require('../models/bookModel')
var objBookModel = new bookModel()

class bookController {

    async create_book(book_name, book_desc, unit_price, discount, owner_id) {
        var result = (await objBookModel.create(book_name, book_desc, unit_price, discount, owner_id))
        return result
    }

    async get_book_all() {
        var result = (await objBookModel.getAll())
        return result
    }

    async get_book_new() {
        var result = (await objBookModel.getNew())
        return result
    }

    async get_book_best_seller() {
        var result = (await objBookModel.getBestSeller())
        return result
    }

    async get_book_on_sale() {
        var result = (await objBookModel.getOnSale())
        return result
    }

    async get_book_recommend() {
        var result = (await objBookModel.getRecommend())
        return result
    }


    async get_book_store(user_id) {
        var result = (await objBookModel.getStoreByUserId(user_id))
        return result
    }

    async get_book_ById(book_id, user_id) {
        var result = (await objBookModel.getById(book_id))
        if(result[0]){
            if(result[0].disable === 'false'){
                return result[0]
            }else if(result[0].owner_id === user_id){
                return result[0]
            }
            else  throw { status:404, message: "Not Found"}
        }else{
            throw { status:404, message: "Not Found"}
        }
    }

    async update_book(user_id, book_id, book_name, book_desc, unit_price) {
        var result_check = (await objBookModel.getById(book_id))
        if(result_check[0]){
            if(result_check[0].owner_id !== user_id) 
                throw { status:401, message: "Unauthorized"}
        }else{
            throw { status:404, message: "Not Found"}
        }

        var result = (await objBookModel.update(book_id, book_name, book_desc, unit_price))
        return result
    }

    async delete_book(user_id, book_id) {
        var result_check = (await objBookModel.getById(book_id))
        if(result_check[0]){
            if(result_check[0].owner_id !== user_id) 
                throw { status:401, message: "Unauthorized"}
        }else{
            throw { status:404, message: "Not Found"}
        }

        var result = (await objBookModel.delete(book_id))
        if(!result){
            throw { status:500, message: "Internal Server Error"}
        }
        return result
    }

    async disable_book(user_id, book_id, status) {
        var result_check = (await objBookModel.getById(book_id))
        if(result_check[0]){
            if(result_check[0].owner_id !== user_id) 
                throw { status:401, message: "Unauthorized"}
        }else{
            throw { status:404, message: "Not Found"}
        }

        switch(status){
            case 'true':
                status = 1
                break;
            case 'false':
                status = 0
                break;
        }
        var result = (await objBookModel.disable(book_id, status))
        return result
    }
}

module.exports = bookController
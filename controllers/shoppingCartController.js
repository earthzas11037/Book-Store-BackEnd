var shoppingCartModel = require('../models/shoppingCartModel')
var objShoppingCartModel = new shoppingCartModel()

class shoppingCartController {

    async create_shoppingCart(user_id, book_id, quantity) {
        var result = (await objShoppingCartModel.getById(user_id, book_id))
        if(result[0]){

            var result = (await objShoppingCartModel.update(user_id, book_id, result[0].quantity+quantity))
            return result
        }else{
            var result = (await objShoppingCartModel.create(user_id, book_id, quantity))
            return result
            // throw { status:404, message: "Not Found"}
        }
    }

    async get_shoppingCart_ByUserId(user_id) {
        var result = (await objShoppingCartModel.getByUserId(user_id))
        return result
    }

    async update_shoppingCart(user_id, book_id, quantity) {
        var result = (await objShoppingCartModel.getById(user_id, book_id))
        if(result[0]){

            var result = (await objShoppingCartModel.update(user_id, book_id, quantity))
            return result
        }else{
            var result = (await objShoppingCartModel.create(user_id, book_id, quantity))
            return result
            // throw { status:404, message: "Not Found"}
        }
    }

    async delete_shoppingCart(user_id, book_id) {
        var result = (await objShoppingCartModel.getById(user_id, book_id))
        if(result[0]){
            var result = (await objShoppingCartModel.delete(user_id, book_id))
            return result
        }else{
            throw { status:404, message: "Not Found"}
        }
    }

}

module.exports = shoppingCartController
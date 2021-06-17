const connect = require('../core/connect');

class shoppingCartModel{
    
    async create(user_id, book_id, quantity) {
        try{
            const sql = `INSERT INTO shopping_cart(user_id, book_id, quantity) 
                            VALUES('${user_id}', '${book_id}', '${quantity}');`;

            let result = await connect.promiseQuery(sql);
            console.log(result)
            return result
        }catch(err){
            console.log(err)
            return []
        }
    }

    async getById(user_id, book_id) {
        try{
            const sql = `SELECT shopping_cart.book_id, shopping_cart.quantity, shopping_cart.create_at, book.book_name, book.unit_price, book.discount
                            FROM shopping_cart INNER JOIN book ON shopping_cart.book_id = book.book_id
                            WHERE shopping_cart.book_id = ${book_id} and shopping_cart.user_id = '${user_id}';`;

            let result = await connect.promiseQuery(sql);
            console.log(result)
            return result
        }catch(err){
            console.log(err)
            return []
        }
    }

    async getByUserId(user_id) {
        try{
            console.log(user_id)
            const sql = `SELECT shopping_cart.book_id, shopping_cart.quantity, shopping_cart.create_at, book.book_name, book.unit_price, book.discount
                            FROM shopping_cart INNER JOIN book ON shopping_cart.book_id = book.book_id
                            WHERE shopping_cart.user_id = '${user_id}';`;

            let result = await connect.promiseQuery(sql);
            console.log(result)
            return result
        }catch(err){
            console.log(err)
            return []
        }
    }

    async update(user_id, book_id, quantity) {
        try{
            const sql = `UPDATE shopping_cart SET quantity = '${quantity}'
                            WHERE book_id = ${book_id} and user_id = '${user_id}';`;

            let result = await connect.promiseQuery(sql);
            console.log(result)
            return result
        }catch(err){
            console.log(err)
            return []
        }
    }

    async delete(user_id, book_id) {
        try{
            const sql = `DELETE FROM shopping_cart
                            WHERE book_id = ${book_id} and user_id = '${user_id}';`;

            let result = await connect.promiseQuery(sql);
            console.log(result)
            return result
        }catch(err){
            console.log(err)
            return []
        }
    }

    async deleteAll(user_id) {
        try{
            const sql = `DELETE FROM shopping_cart
                            WHERE user_id = '${user_id}';`;

            let result = await connect.promiseQuery(sql);
            console.log(result)
            return result
        }catch(err){
            console.log(err)
            return []
        }
    }

}

module.exports = shoppingCartModel
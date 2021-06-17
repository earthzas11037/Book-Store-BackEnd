const connect = require('../core/connect');

class ratingModel{
    
    async create(user_id, book_id, rating) {
        try{
            const sql = `INSERT INTO rating(user_id, book_id, rating) 
                            VALUES('${user_id}', '${book_id}', '${rating}');`;

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
            const sql = `SELECT book_id, user_id, rating
                            FROM rating
                            WHERE book_id = ${book_id} and user_id = '${user_id}';`;

            let result = await connect.promiseQuery(sql);
            console.log(result)
            return result
        }catch(err){
            console.log(err)
            return []
        }
    }

    async update(user_id, book_id, rating) {
        try{
            const sql = `UPDATE rating SET rating = '${rating}'
                            WHERE book_id = ${book_id} and user_id = '${user_id}';`;

            let result = await connect.promiseQuery(sql);
            console.log(result)
            return result
        }catch(err){
            console.log(err)
            return []
        }
    }

    async delete(book_id) {
        try{
            const sql = `DELETE FROM rating
                            WHERE book_id = ${book_id} and user_id = '${user_id}';`;

            let result = await connect.promiseQuery(sql);
            console.log(result)
            return result
        }catch(err){
            console.log(err)
            return []
        }
    }

}

module.exports = ratingModel
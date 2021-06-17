const connect = require('../core/connect');

class bookModel{
    
    async create(book_name, book_desc, unit_price, discount, owner_id) {
        try{
            const sql = `INSERT INTO book(book_name, book_desc, unit_price, discount, owner_id) 
                            VALUES('${book_name}', '${book_desc}', '${unit_price}', '${discount}', '${owner_id}');`;

            let result = await connect.promiseQuery(sql);
            console.log(result)
            return result
        }catch(err){
            console.log(err)
            return []
        }
    }

    async getAll() {
        try{
            const sql = `SELECT book.book_id, book.book_name, book.book_desc, book.unit_price, book.discount, book.create_at,  IF(book.disable, 'true', 'false') disable, book.owner_id, user.user_name
                            ,(select count(*) as countt FROM rating where book_id = book.book_id) as count_reviews
                            ,(select CAST(AVG(rating) AS DECIMAL(10,2)) FROM rating where book_id = book.book_id) as avg_rating
                            FROM (book INNER JOIN user ON book.owner_id = user.user_id)
                            WHERE disable = 0
                            ORDER BY book.create_at DESC;`;

            let result = await connect.promiseQuery(sql);
            console.log(result)
            return result
        }catch(err){
            console.log(err)
            return []
        }
    }

    async getNew() {
        try{
            const sql = `SELECT book.book_id, book.book_name, book.book_desc, book.unit_price, book.discount, book.create_at,  IF(book.disable, 'true', 'false') disable, book.owner_id, user.user_name
                            ,(select count(*) as countt FROM rating where book_id = book.book_id) as count_reviews
                            ,(select CAST(AVG(rating) AS DECIMAL(10,2)) FROM rating where book_id = book.book_id) as avg_rating
                            FROM (book INNER JOIN user ON book.owner_id = user.user_id)
                            WHERE disable = 0
                            ORDER BY book.create_at DESC
                            LIMIT 20;`;

            let result = await connect.promiseQuery(sql);
            console.log(result)
            return result
        }catch(err){
            console.log(err)
            return []
        }
    }

    async getBestSeller() {
        try{
            const sql = `SELECT book.book_id, book.book_name, book.book_desc, book.unit_price, book.discount, book.create_at,  IF(book.disable, 'true', 'false') disable, book.owner_id, user.user_name
                            ,(select count(*) as countt FROM rating where book_id = book.book_id) as count_reviews
                            ,(select CAST(AVG(rating) AS DECIMAL(10,2)) FROM rating where book_id = book.book_id) as avg_rating
                            FROM (book INNER JOIN user ON book.owner_id = user.user_id)
                            WHERE disable = 0
                            ORDER BY book.create_at DESC
                            LIMIT 20;`;

            let result = await connect.promiseQuery(sql);
            console.log(result)
            return result
        }catch(err){
            console.log(err)
            return []
        }
    }

    async getOnSale() {
        try{
            const sql = `SELECT book.book_id, book.book_name, book.book_desc, book.unit_price, book.discount, book.create_at,  IF(book.disable, 'true', 'false') disable, book.owner_id, user.user_name
                            ,(select count(*) as countt FROM rating where book_id = book.book_id) as count_reviews
                            ,(select CAST(AVG(rating) AS DECIMAL(10,2)) FROM rating where book_id = book.book_id) as avg_rating
                            FROM (book INNER JOIN user ON book.owner_id = user.user_id)
                            WHERE disable = 0 and book.discount > 0
                            ORDER BY book.create_at DESC
                            LIMIT 20;`;

            let result = await connect.promiseQuery(sql);
            console.log(result)
            return result
        }catch(err){
            console.log(err)
            return []
        }
    }

    async getRecommend() {
        try{
            const sql = `SELECT book.book_id, book.book_name, book.book_desc, book.unit_price, book.discount, book.create_at,  IF(book.disable, 'true', 'false') disable, book.owner_id, user.user_name
                            ,(select count(*) as countt FROM rating where book_id = book.book_id) as count_reviews
                            ,(select CAST(AVG(rating) AS DECIMAL(10,2)) FROM rating where book_id = book.book_id) as avg_rating
                            FROM (book INNER JOIN user ON book.owner_id = user.user_id)
                            WHERE disable = 0
                            ORDER BY book.create_at DESC
                            LIMIT 20;`;

            let result = await connect.promiseQuery(sql);
            console.log(result)
            return result
        }catch(err){
            console.log(err)
            return []
        }
    }
    
    async getStoreByUserId(user_id) {
        try{
            const sql = `SELECT book.book_id, book.book_name, book.book_desc, book.unit_price, book.discount, book.create_at,  IF(book.disable, 'true', 'false') disable, book.owner_id, user.user_name
                            ,(select count(*) as countt FROM rating where book_id = book.book_id) as count_reviews
                            ,(select CAST(AVG(rating) AS DECIMAL(10,2)) FROM rating where book_id = book.book_id) as avg_rating
                            FROM (book INNER JOIN user ON book.owner_id = user.user_id)
                            WHERE book.owner_id = ${user_id}
                            ORDER BY book.create_at DESC;`;

            let result = await connect.promiseQuery(sql);
            console.log(result)
            return result
        }catch(err){
            console.log(err)
            return []
        }
    }

    async getById(book_id) {
        try{
            const sql = `SELECT book.book_id, book.book_name, book.book_desc, book.unit_price, book.discount, book.create_at, IF(book.disable, 'true', 'false') disable, book.owner_id, user.user_name
                            ,(select count(*) as countt FROM rating where book_id = book.book_id) as count_reviews
                            ,(select CAST(AVG(rating) AS DECIMAL(10,2)) FROM rating where book_id = book.book_id) as avg_rating
                            FROM book INNER JOIN user ON book.owner_id = user.user_id
                            WHERE book_id = ${book_id} ;`;

            let result = await connect.promiseQuery(sql);
            console.log(result)
            return result
        }catch(err){
            console.log(err)
            return []
        }
    }

    async update(book_id, book_name, book_desc, unit_price, discount) {
        try{
            const sql = `UPDATE book SET book_name = '${book_name}',
                                        book_desc = '${book_desc}',
                                        unit_price = '${unit_price}'
                            WHERE book_id = '${book_id}';`;

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
            const sql = `DELETE FROM book
                            WHERE book_id = '${book_id}';`;

            let result = await connect.promiseQuery(sql);
            console.log(result)
            return result
        }catch(err){
            console.log(err)
            return false
        }
    }

    async disable(book_id, status) {
        try{
            const sql = `UPDATE book SET disable = '${status}'
                            WHERE book_id = '${book_id}';`;

            let result = await connect.promiseQuery(sql);
            console.log(result)
            return result
        }catch(err){
            console.log(err)
            return []
        }
    }
}

module.exports = bookModel
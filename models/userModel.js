const connect = require('../core/connect');

class userModel{
    
    async create(user_name, email, password) {
        try{
            const sql = `INSERT INTO user(user_name, email, password) 
                            VALUES('${user_name}', '${email}', '${password}');`;

            let result = await connect.promiseQuery(sql);
            return result
            console.log(result)
        }catch(err){
            console.log(err)
            return []
        }
    }

    async getByEmail(email) {
        try{
            const sql = `SELECT * FROM user WHERE email = '${email}';`;
            let result = await connect.promiseQuery(sql);
            return result
            console.log(result)
        }catch(err){
            console.log(err)
            return []
        }
    }

    async getCurrentById(user_id) {
        try{
            const sql = `SELECT user_id, user_name, email 
                            FROM user 
                            WHERE user_id = '${user_id}';`;
            let result = await connect.promiseQuery(sql);
            return result
            console.log(result)
        }catch(err){
            console.log(err)
            return []
        }
    }
}

module.exports = userModel
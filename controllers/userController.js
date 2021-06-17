const dotenv = require('dotenv').config();
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const key = process.env.SECRET_KEY;
var userModel = require('../models/userModel')
var objUserModel = new userModel()

class userController {

    async create_user(user_name, email, password) {
        var result = (await objUserModel.getByEmail(email))
        if(!result[0]){
            const hash_password = await bcrypt.hash(password, 10)
            var result = (await objUserModel.create(user_name, email, hash_password))
            return result
        }
        throw { status:400, message: "Bad Request"}
    }

    async login(email, password) {
        var result = (await objUserModel.getByEmail(email))
        if(result[0]){
            if(await bcrypt.compare(password, result[0].password) ){
                const playload = {
                    user_id: result[0].user_id,
                    email: result[0].email
                }
                const token = jwt.sign(playload, key, { expiresIn: '1d' })

                return {
                    token: token,
                    user_id: result[0].user_id,
                    user_name: result[0].user_name,
                    email: result[0].email
                }
            }else{
                throw new Error('email or password not correct!');
            }
        }
        throw new Error('email or password not correct!');
    }

    async current_user(user_id) {
        var result = (await objUserModel.getCurrentById(user_id))
        if(result[0]){
            return result[0]
        }
        return result
    }
}

module.exports = userController
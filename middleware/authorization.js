const dotenv = require('dotenv');
dotenv.config();
const key = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');

exports.decode = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        req.user.user_id = null;
        next();
    }
    try {
        const decoded = jwt.verify(token, key)
        req.user = decoded;
        next();
    }
    catch (ex) {
        req.user.user_id = null;
        next();
    }
}

exports.authorization = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send('Access denied. No JWT provided.');
    }
    try {
        const decoded = jwt.verify(token, key)
        req.user = decoded;
        next();
    }
    catch (ex) {
        res.status(401).send('Invalid JWT.');
    }
}

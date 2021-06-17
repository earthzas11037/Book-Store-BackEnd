const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

// api
const book_api = require('./routes/book');
const user_api = require('./routes/user');
const rating_api = require('./routes/rating');
const cart_api = require('./routes/shopping_cart');
const port = 5000;

const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

// call api
app.use("/api/book", book_api);
app.use("/api/user", user_api);
app.use("/api/rating", rating_api);
app.use("/api/cart", cart_api);

//if we are here then the specified request is not found
app.use((req, res, next)=> {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

//all other requests are not implemented.
app.use((err, req, res, next) => {
    res.status(err.status || 501);
    res.json({
        error: {
            code: err.status || 501,
            message: err.message
        }
    });
});

//module.exports = app;

app.listen(port, function() {
    console.log(`Example app listening on port ${port}!`)
})
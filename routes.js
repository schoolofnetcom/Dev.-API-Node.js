module.exports = function (app) {
    app.use('/products', require('./products'));
    app.use('/shopping', require('./shopping'));
    app.use('/purchase', require('./purchase'));
};
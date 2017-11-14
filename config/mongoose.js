const mongoose = require('mongoose');
const { mongoURI } = require('./../constants/constants');
//credentials -> fontuser:Ign747212
mongoose.Promise = global.Promise;
// mongoose.connect(`mongodb://${process.env.mongoCredentials}${mongoURI}`);
mongoose.connect('mongodb://localhost:27017/point-fame');

module.exports = { mongoose };
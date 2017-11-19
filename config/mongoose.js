const mongoose = require('mongoose');
const { mongoURI } = require('./../constants/constants');
//credentials -> fontuser:Ign747212
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${process.env.mongoCredentials}${mongoURI}`);
// mongoose.connect('mongodb://localhost:27017/point-fame');
// mongoose.connect(`mongodb://fontuser:Ign747212${mongoURI}`);
mongoose.connection.on('error', () => {
	throw new Error(`unable to connect to database: ${mongoURI}`);
});

module.exports = { mongoose };
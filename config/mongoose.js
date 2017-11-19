const mongoose = require('mongoose');
const { mongoURI } = require('./../constants/constants');

mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://${process.env.mongoCredentials}${mongoURI}`);

mongoose.connection.on('error', () => {
	throw new Error(`unable to connect to database: ${mongoURI}`);
});

module.exports = { mongoose };
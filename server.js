const app = require('./config/express');
const { mongoose } = require('./config/mongoose');

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
const mongoose = require('mongoose');
require('dotenv').config();

const connectionString = process.env.mongoConnectionString;

mongoose.set('strictQuery', true);
mongoose
	.connect(connectionString)
	.then(() => {
		console.log('CONNECTED TO MONGO ATLAS DATABASE');
	})
	.catch((error) => {
		console.log('ERROR CONNECTING TO DB', error);
	});

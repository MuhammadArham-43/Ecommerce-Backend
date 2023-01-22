const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const db = require('./db/index');

const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('HELLO WORLD');
});

app.use('/products/', productRouter);
app.use('/user/', userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`APP LISTENING ON PORT ${PORT}`);
});

// app.use((req, res, next) => {
// 	next(createError(404));
// });

app.use((err, req, res, next) => {
	if (!err.statusCode) err.statusCode = 500;
	res.status(err.statusCode).json({ error: err.message });
});

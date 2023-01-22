const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		const token = req.headers.authorization.split(' ')[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
		const { id } = decoded;
		req.user = await User.findById(id).select('-password');
		next();
	} else {
		res.status(401).send({ error: 'Auth Token Failed' });
	}
};

module.exports = protect;

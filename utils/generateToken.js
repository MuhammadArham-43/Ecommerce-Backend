const jwt = require('jsonwebtoken');

const generateToken = async (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
		expiresIn: '30d',
	});
};

module.exports = generateToken;

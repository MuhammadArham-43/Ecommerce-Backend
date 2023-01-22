const validator = require('validator');

const validateUserRegister = (name, email, password) => {
	if (!validator.isAlpha(name)) return false;
	if (!validator.isEmail(email)) return false;
	if (!validator.isLength(password, { min: 6, max: 14 })) return false;
	return true;
};

const validateUserLogin = (email, password) => {
	if (!validator.isEmail(email)) return false;
	if (!validator.isLength(password, { min: 6, max: 14 })) return false;
	return true;
};

exports.registerValidator = validateUserRegister;
exports.loginValidator = validateUserLogin;

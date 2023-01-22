const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const validators = require('../utils/validations');

class UserController {
	authUser = async (req, res) => {
		const { email, password } = req.body;

		if (!validators.loginValidator(email, password)) {
			return res.status(400).send({
				error: 'Invalid Login Parameters',
			});
		}

		const user = await User.findOne({ email });
		// console.log(user);
		if (user && (await user.matchPassword(password))) {
			console.log(user);
			res.json({
				id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				token: await generateToken(user._id),
			});
		} else {
			console.log('NO USER FOUND');
			res.status(401).send({ error: 'User not Found' });
		}
	};

	getUserProfile = async (req, res) => {
		const user = await User.findById(req.user._id).select('-password');

		if (user) {
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
			});
		} else {
			res.status(404).send({ error: 'No User Found' });
		}
	};

	registerUser = async (req, res) => {
		const { name, email, password } = req.body;
		const validated = validators.registerValidator(name, email, password);

		if (!validated) {
			return res
				.status(400)
				.send({ error: 'Invalid Register Parameters' });
		}

		const userExists = await User.findOne({ email });
		if (userExists) {
			res.status(400).send({ error: 'User Already Exists' });
		} else {
			const user = await User.create({
				name: name,
				email: email,
				password: password,
			});
			if (user) {
				res.status(201).json({
					_id: user._id,
					name: user.name,
					email: user.email,
					isAdmin: user.isAdmin,
					token: await generateToken(user._id),
				});
			} else {
				res.status(401).send({ error: 'Error creating new user' });
			}
		}
	};
}

module.exports = UserController;

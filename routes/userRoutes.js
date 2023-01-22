const express = require('express');
const UserController = require('../controllers/userController');
const protect = require('../middlewares/protect');

const router = express.Router();
const userController = new UserController();

router.route('/').post(userController.registerUser);
router.route('/login').post(userController.authUser);
router.route('/getUserProfile').post(protect, userController.getUserProfile);

module.exports = router;

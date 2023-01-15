const express = require('express');
const ProductController = require('../controllers/productController');

const productController = new ProductController();

const router = express.Router();

router.route('/').get(productController.getProducts);
router.route('/product/:id').get(productController.getProduct);

module.exports = router;

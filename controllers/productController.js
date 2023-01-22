const Products = require('../models/productModel');

class ProductController {
	getProducts = async (req, res) => {
		try {
			const products = await Products.find({});
			res.json(products);
		} catch (error) {
			throw new Error('Error Getting Products');
			res.status(404).send({ error });
		}
	};

	getProduct = async (req, res, next) => {
		const productId = req.params.id;
		// console.log(productId);
		Products.findById(productId, (error, data) => {
			if (error) {
				return next(error);
			} else {
				res.json(data);
			}
		});
	};
}

module.exports = ProductController;

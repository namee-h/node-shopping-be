const Product = require("../models/Product");
const productController = {};

productController.createProduct = async (req, res) => {
  try {
    const { sku, name, size, category, price, description, image, stock } =
      req.body;
    const product = new Product({
      sku,
      name,
      size,
      category,
      price,
      description,
      image,
      stock,
    });
    await product.save();
    res.status(200).json({ status: "success", product });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};
productController.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ status: "success", data: products });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};
module.exports = productController;

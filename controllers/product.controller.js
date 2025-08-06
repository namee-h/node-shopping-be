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
    // MongoDB 중복 키 에러 처리
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      if (field === "sku") {
        return res.status(400).json({
          status: "fail",
          message: "이미 존재하는 SKU입니다. 다른 SKU를 입력해주세요.",
        });
      }
    }

    // MongoDB validation 에러 처리
    if (error.name === "ValidationError") {
      const field = Object.keys(error.errors)[0];
      const fieldName = error.errors[field].path;

      if (fieldName === "image") {
        return res.status(400).json({
          status: "fail",
          message: "이미지는 필수 입력 항목입니다.",
        });
      }

      if (fieldName === "sku") {
        return res.status(400).json({
          status: "fail",
          message: "SKU는 필수 입력 항목입니다.",
        });
      }

      if (fieldName === "name") {
        return res.status(400).json({
          status: "fail",
          message: "상품명은 필수 입력 항목입니다.",
        });
      }

      if (fieldName === "price") {
        return res.status(400).json({
          status: "fail",
          message: "가격은 필수 입력 항목입니다.",
        });
      }

      return res.status(400).json({
        status: "fail",
        message: `${fieldName}은(는) 필수 입력 항목입니다.`,
      });
    }

    // 기타 에러 처리
    return res.status(400).json({ status: "fail", message: error.message });
  }
};
productController.getProducts = async (req, res) => {
  try {
    const { page, name } = req.query;
    const condition = name ? { name: { $regex: name, $options: "i" } } : {};
    let query = Product.find(condition);

    const productList = await query.exec();
    res.status(200).json({ status: "success", data: productList });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};
module.exports = productController;

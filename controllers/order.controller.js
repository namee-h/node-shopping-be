const Order = require("../models/Order");
const productController = require("./product.controller");
const randomStringGenerator = require("../utils/randomStringGenerator");
const orderController = {};
const PAGE_SIZE = 3;

orderController.createOrder = async (req, res) => {
  try {
    const { userId } = req;
    const { totalPrice, shipTo, contact, orderList } = req.body;
    const insufficientStockItems = await productController.checkItemListStock(
      orderList
    );
    if (insufficientStockItems.length > 0) {
      const errorMessage = insufficientStockItems.reduce(
        (total, item) => (total += item.message),
        ""
      );
      throw new Error(errorMessage);
    }
    const newOrder = new Order({
      userId,
      totalPrice,
      shipTo,
      contact,
      items: orderList,
      orderNum: randomStringGenerator(),
    });
    await newOrder.save();

    res.status(200).json({ status: "success", orderNum: newOrder.orderNum });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

orderController.getOrder = async (req, res) => {
  try {
    const { userId } = req;
    const order = await Order.find({ userId }).populate({
      path: "items.productId",
      select: "name price image stock", // 필요한 상품 정보만 선택
    });
    res.status(200).json({ status: "success", order });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

orderController.getOrderList = async (req, res) => {
  try {
    const { page, orderNum } = req.query;
    const condition = orderNum
      ? { orderNum: { $regex: orderNum, $options: "i" } }
      : {};
    let query = Order.find(condition)
      .populate({
        path: "items.productId",
        select: "name price image stock",
      })
      .populate({
        path: "userId",
        select: "email name",
      })
      .sort({ createdAt: -1 });
    let response = { status: "success" };
    if (page) {
      query.skip((page - 1) * PAGE_SIZE).limit(PAGE_SIZE);
      const totalCount = await Order.countDocuments(condition);
      const totalPageNum = Math.ceil(totalCount / PAGE_SIZE);
      response.totalPageNum = totalPageNum;
    }
    const orderList = await query.exec();
    response.orderList = orderList;
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};
module.exports = orderController;

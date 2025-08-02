const mongoose = require("mongoose");
const User = require("./User");
const Product = require("./Product");
const Schema = mongoose.Schema;
const cartSchema = new Schema(
  {
    userId: { type: mongoose.ObjectId, ref: User },
    items: [
      {
        productId: { type: mongoose.ObjectId, ref: Product },
        size: { type: String, required: true }, // 상품 사이즈
        qty: { type: Number, required: true, default: 1 }, // 상품 수량
      },
    ],
  },
  { timestamps: true }
);

cartSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.__v; //버전 정보도 제외
  delete obj.createdAt; //생성일시도 제외
  delete obj.updatedAt; //수정일시도 제외
  return obj;
};

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;

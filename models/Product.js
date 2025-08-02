const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema(
  {
    sku: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    stock: { type: Object, required: true },
    category: { type: Array, required: true },
    status: { type: String, default: "active" },
    isDeleted: { type: Boolean, default: false }, // 상품 삭제 여부
  },
  { timestamps: true }
);

productSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.__v; //버전 정보도 제외
  delete obj.createdAt; //생성일시도 제외
  delete obj.updatedAt; //수정일시도 제외
  return obj;
};

const Product = mongoose.model("Product", productSchema);
module.exports = Product;

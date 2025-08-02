const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    level: { type: String, default: "customer" }, //2types: customer, admin
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.password; //비밀번호는 응답에서 제외
  delete obj.__v; //버전 정보도 제외
  delete obj.createdAt; //생성일시도 제외
  delete obj.updatedAt; //수정일시도 제외
  return obj;
};

const User = mongoose.model("User", userSchema);
module.exports = User;

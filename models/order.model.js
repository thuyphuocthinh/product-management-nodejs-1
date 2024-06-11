const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const ordersSchema = new mongoose.Schema(
  {
    user_id: String,
    cart_id: String,
    userInfo: {
      fullName: String,
      phone: String,
      email: String,
      address: String,
    },
    products: [
      {
        product_id: String,
        price: Number,
        discountPercentage: Number,
        quantity: Number,
      },
    ],
  },
  { timestamps: true }
);

const Orders = mongoose.model("Orders", ordersSchema, "orders");

module.exports = Orders;

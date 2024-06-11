const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const cartsSchema = new mongoose.Schema(
  {
    user_id: String,
    products: [
      {
        product_id: String,
        quantity: Number,
      },
    ],
  },
  { timestamps: true }
);

const Carts = mongoose.model("Carts", cartsSchema, "carts");

module.exports = Carts;

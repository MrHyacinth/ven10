const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true
  }
 
});

const Product = model('Product', ProductSchema);

module.exports = Product;

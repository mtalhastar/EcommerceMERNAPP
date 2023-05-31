const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    cartItems: [],
    totalPrice: {
      type: Number,
      default: 0
    }
  });

  module.exports = mongoose.model('Cart', CartSchema)
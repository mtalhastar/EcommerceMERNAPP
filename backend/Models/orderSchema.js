const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 4
    }
  }],
  status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  address: {
    type: String,
    required: true
  },
  deliveryDate: {
    type: String,
    default: '4 days',
    required: true
  },                                   
  amount: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);

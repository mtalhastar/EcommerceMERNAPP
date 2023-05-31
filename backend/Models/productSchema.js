const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  image:{
    type:String,
    required:true
  },
  totalQuantity:{
   type:Number,
   required:true
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      content: {
        type: String,
      }
    }
  ],
  ratings: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      value: {
        type: Number,
        min: 1,
        max: 5
      }
    }
  ]
},{timestamps:true});


module.exports = mongoose.model('Product', productSchema);

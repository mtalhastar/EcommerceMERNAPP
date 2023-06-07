const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deliverySchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        order:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
            required: true,
            unique:true
        },
    } , {timestamps: true});

module.exports = mongoose.model('Delivery', deliverySchema);

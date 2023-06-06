const order = require('../Models/orderSchema');
const Delivery = require('../Models/deliveryModel');


const viewAllAvailableOrders= async (req, res) => {
    try{
    const orders = await order.find({status: 'pending'});
    res.status(200).json({
        success: true,
        orders
    });
    }catch(err){
        next(err);
    }
}

const getDelivery= async (req, res) => {
    try{
    const delivery = await Delivery.find()
    .populate("user","username")
    .populate("order");
    res.status(200).json({
        success: true,
        delivery
    });
    }catch(err){
        res.json({err})
    }
}


const getADelivery= async (req, res) => {
    try{
     const user=req.decoded.id
    const delivery = await Delivery.find({user:user})
    .populate("user","username")
    .populate("order");
    res.status(200).json({
        success: true,
        delivery
    });
    }catch(err){
        res.json({err})
    }
}

const AcceptDeliveryOrders = async (req, res) => {
try {
    const { id } = req.params;
    const orderFound = await order.findById(id);
    if (!orderFound) {
      return res.status(404).json({ success: false, message: "Order not found" }); // Added response message
    }
    const newDelivery = await Delivery.create({
      user: req.decoded.id,
      order: orderFound,
    });
    res.status(200).json({
      success: true,
      newDelivery,
    });
} catch (err) {
    res.status(400).json({ success: false, message: "An error occurred" }); // Added response message
}
};

const UpdateDeliveryStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        console.log(id)
        console.log(status)
        const orders = await order.findById(id);
        if (!orders) {
            return res.status(404)
        }
        orders.status = status;
        await orders.save();
        res.status(200).json({
            success: true,
            orders
        });
    } catch (err) {
        res.status(400).json({err:err})
    }
}

module.exports={
    viewAllAvailableOrders,
    UpdateDeliveryStatus,
    AcceptDeliveryOrders,
    getDelivery,
    getADelivery
}
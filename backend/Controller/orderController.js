const Order = require('../Models/orderSchema');
// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate({
      path: 'products.product',
      model: 'Product',
    })
    .populate('user', 'username');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve orders' });
  }
};

const getPendingOrders = async (req, res) => {
  try {
    const orders = await Order.find({status: 'pending'}).populate({
      path: 'products.product',
      model: 'Product',
    })
    .populate('user', 'username');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve orders' });
  }
};

// Get a specific order by ID
const getOrderById = async (req, res) => {
  const { id } = req.params;
  const _id=id
  try {
    const order = await Order.findById(_id).populate('products.product');
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the order' });
  }
};


// Get a specific order by ID
const getOrderByRole = async (req, res) => {

  try {
    const order = await Order.find({user:req.decoded.id}).populate({
      path: 'products.product',
      model: 'Product',
    })
    .populate('user', 'username');
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the order' });
  }
};

// Create a new order
const createOrder = async (req, res) => {
  const user =req.decoded.id;
  const {products,amount,status,address,deliveryDate} = req.body;
  try {
    const order = await Order.create({user,products, address, amount,status,deliveryDate });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create the order' });
  }
};
// Update an existing order
const updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const { user, products, status, Address, DeliveryDate, Amount } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { user, products, status, Address, DeliveryDate, Amount },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the order' });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the order' });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderByRole,
  getPendingOrders
};

const express = require('express');
const router = express.Router();
const {DecodeUser,checkRider,checkSeller,checkBuyer,checkAdmin}=require("../middleware/auth")
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderByRole
} = require('../Controller/orderController');

// Get all job applications
router.get('/getorder', DecodeUser,checkRider, getAllOrders);
// Create a new job application
router.post('/createOrder', DecodeUser,checkBuyer,createOrder);
// Get job applications submitted to jobs posted by an employer
router.get('/getorder/:id', DecodeUser,checkSeller,getOrderById);
// Update a job application by ID
router.put('/updateorder/:id', DecodeUser,checkAdmin, updateOrder);
// Delete a job application by ID
router.delete('/deleteOrder/:id',DecodeUser,checkAdmin,deleteOrder);
router.get('/getOrderbyRole/:id',DecodeUser,checkSeller,getOrderByRole);
module.exports = router;
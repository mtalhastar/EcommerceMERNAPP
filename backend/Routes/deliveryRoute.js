const express = require('express');
const router = express.Router();
const {DecodeUser,checkRider,checkSeller,checkBuyer,checkAdmin}=require("../middleware/auth")
const {
    viewAllAvailableOrders,
    UpdateDeliveryStatus,
    AcceptDeliveryOrders,
    getDelivery,
    getADelivery,
    deleteDelivery
} = require('../Controller/deliveryController');

// Get all job applications
router.get('/getAllOrders', DecodeUser,checkRider, viewAllAvailableOrders);
// Create a new job application
router.put('/UpdateDeliveryStatus/:id', DecodeUser,checkRider,UpdateDeliveryStatus);
// Get job applications submitted to jobs posted by an employer
router.post('/acceptOrder/:id', DecodeUser,checkRider,AcceptDeliveryOrders);
// Update a job application by ID
router.get('/getDeliveries', DecodeUser,checkAdmin,getDelivery);
router.get('/myDeliveries', DecodeUser,checkRider,getADelivery);
router.delete('/deleteDelivery/:id', DecodeUser,checkAdmin,deleteDelivery);
module.exports = router;
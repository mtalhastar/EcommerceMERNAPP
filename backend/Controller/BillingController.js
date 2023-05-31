const asyncHandler = require('express-async-handler')
const Billing = require('../Models/BillingModel');

let getAllBills = asyncHandler(async (request, response) => {
    try {
        const billings = await Billing.find()
        response.json(billings)
      } catch (error) {
        console.error(error.message)
        response.status(500).send('Server Error')
      }
})

let getBill = asyncHandler(async (request, response) => {
    try {
        const billing = await Billing.findById(request.params.id)
        if (!billing) {
          return response.status(404).json({ message: 'Billing not found' })
        }
        response.json(billing)
      } catch (error) {
        console.error(error.message);
        response.status(500).send('Server Error');
      }
})

let createBill = asyncHandler(async (request, response) => {
    try {
        const newBilling = new Billing(request.body);
        const billing = await newBilling.save();
        response.status(201).json(billing);
      } catch (error) {
        console.error(error.message);
        response.status(500).send('Server Error');
      }
})

let updateBill = asyncHandler(async (request, response) => {
    try {
        const billing = await Billing.findByIdAndUpdate(request.params.id, request.body, { new: true })
        if (!billing) {
          return response.status(404).json({ message: 'Billing not found' })
        }
        response.json(billing)
      } catch (error) {
        console.error(error.message)
        response.status(500).send('Server Error')
      }
})  

let deleteBill = asyncHandler(async (request, response) => {
    try {
        const billing = await Billing.findByIdAndRemove(request.params.id);
        if (!billing) {
          return response.status(404).json({ message: 'Billing not found' });
        }
        response.json({ message: 'Billing deleted successfully' });
      } catch (error) {
        console.error(error.message);
        response.status(500).send('Server Error');
      }
})

module.exports = {
    getAllBills,
    getBill, 
    createBill,
    updateBill,
    deleteBill
} 
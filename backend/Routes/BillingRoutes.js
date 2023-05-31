const express = require('express')
const router = express.Router()

const { getAllBills, getBill, createBill, updateBill, deleteBill } = require('../Controller/BillingController')

router.get('/', getAllBills)
router.get('/:id', getBill)
router.post('/', createBill)
router.put('/:id', updateBill)
router.delete('/:id', deleteBill)

module.exports = router
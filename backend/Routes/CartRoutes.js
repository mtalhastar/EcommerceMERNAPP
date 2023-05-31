const express = require('express')
const cartRouter = express.Router()
const {addToCart,removeFromCart,viewCarts, viewCart, updateCart} = require('../Controller/CartController')

cartRouter.use(express.json())

cartRouter.post('/',addToCart)
cartRouter.delete('/:productId',removeFromCart)
cartRouter.get('/',viewCarts)
cartRouter.get('/:userId',viewCart)  
cartRouter.put('/',updateCart)

module.exports = cartRouter
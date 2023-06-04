const Cart = require('../Models/CartModel')
const CartItem =require('../Models/CartItemModel')

const asyncHandler = require('express-async-handler')

const addToCart = asyncHandler( async (request, response) => {
    const {id} =request.decoded
    const { productId, name, image, price } = request.body;
    console.log(userId, productId, name, image, price )
    try {

      let cart = await Cart.findOne({ userId: userId });
      
      if (!cart) {
        cart = new Cart({
          userId: userId,
          cartItems: []
        });
      }
  
      let cartItem = cart.cartItems.find(item => item.productId.toString() === productId);
  
      if (cartItem) {
        cartItem.quantity = cartItem.quantity + 1;
        cartItem.price = price * cartItem.quantity;
      
      } 
      else {
        cartItem = new CartItem({
          productId: productId,
          name:name,
          image: image,
          price: price,
          quantity: 1
        });
      
        cart.cartItems.push(cartItem);
      }
      
    cart.totalPrice = 0
     cart.cartItems.forEach(item =>{
        cart.totalPrice += item.price
     })
  
      await cart.save();
  
      response.status(201).json(cart);
    } catch (error) {
      console.error(error.message);
      response.status(500).send('Product not added to cart');
    }
  });

  
  const updateCart = asyncHandler(async (req, res) => {
    const { userId, productId, quantity } = req.body
  
    try {
      let cart = await Cart.findOne({ userId: userId })
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' })
      }
  
      const cartItem = cart.cartItems.find(item => item.productId.toString() === productId)
  
      if (!cartItem) {
        return res.status(404).json({ message: 'Product not found in cart' })
      }
  
      cartItem.quantity = quantity
  
      if (cartItem.quantity === 0) {
        cart.cartItems = cart.cartItems.filter(item => item.productId.toString() !== productId)
      }
  
      cart.totalPrice = cart.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  
      await cart.save()
  
      res.status(200).json(cart)
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Failed to update cart')
    }
  })
  
let removeFromCart = asyncHandler( async (request, response) => {
  
  const { userId } = request.body;
  const { productId } = request.params;

  console.log(userId, productId)

  try {
    const cart = await Cart.findOne({ userId:userId });
    if (!cart) {
      return response.status(404).json({ message: 'Cart not found' });
    }

    const cartItem = cart.cartItems.find((item) => item.productId.toString() === productId.toString());
    if (!cartItem) {
      return response.status(404).json({ message: 'Cart item not found' });
    }
    
    cart.cartItems.pull(cartItem.productId)
    cart.totalPrice = 0
            cart.cartItems.forEach(item =>{
            cart.totalPrice += item.price
         })
    await cart.save()

    return response.json({ message: 'Cart item removed successfully', cart });
  } catch (error) {
    console.log(error.message)
    response.send(error.message)
  }
});

let viewCarts = asyncHandler( async (request, response) => {
    try {
      const carts = await Cart.find()
      response.json(carts)
    } catch (error) {
      console.error(error.message)
      response.status(500).send('Server Error')
    }
})

let viewCart = asyncHandler( async (request, response) => {
  const { userId } = request.params;

  try {
    const cart = await Cart.findOne({ userId: userId });
    
    if (!cart) {
      return response.status(404).json({ message: 'Cart not found' });
    }
    
    response.json(cart);
  } catch (error) {
    console.error(error.message);
    response.status(500).send('Server Error');
  }
})

  module.exports = {
    addToCart,
    removeFromCart,
    viewCarts,
    viewCart,
    updateCart
}
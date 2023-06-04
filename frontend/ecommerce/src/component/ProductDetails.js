import 'material-symbols';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import 'material-symbols'
import '../index.css'

import { useState,useEffect,useContext } from 'react'
const ProductDetails = ({  product , addProductsToCart }) => {


    const AddToCart = () => {
     addProductsToCart(product._id)
    }
    
const DeleteTheProduct = async (e) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
        // Assuming you have the product ID from the event target
      const response = await fetch(`/product/deleteProduct/`+product._id, {
       method: 'DELETE',
        headers:{'token':token},
    });
  } catch (error) {
    // Handle network or other errors
    console.error('Error:', error);
  }
};
   return (
        <div className="buyer-details">
            <p><strong>Product: </strong>{product.name}</p>
            <p><strong>price: </strong>{product.price}</p>
            <p><strong>seller: </strong>{product.seller.name}</p>
            <img src={product.image} alt="img"></img>
        {/* <label className="label1">Change Status</label>
        <select className="dropdown1" onChange={handleOptionChange}>
            <option value="">Select Option</option>
            <option value="accepted">accepted</option>
            <option value="rejected">rejected</option>
        </select> */}
        <button className='a' onClick={AddToCart} >AddToCart</button>
        <button className='a' onClick={DeleteTheProduct} >Delete</button>
        </div>
    )
}

export default ProductDetails
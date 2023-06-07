import { useSelector } from "react-redux"
import { useState } from "react"
import CartItem from "../component/CartItem"
import StripeCheckout from 'react-stripe-checkout';
import {useNavigate} from 'react-router-dom'

function CartPage(){

        const navigate = useNavigate()
    const navigateToCheckout = () => {
        if(cart.totalPrice > 0){
        navigate('/Checkout')
        }
        else{
            alert("Cart is empty")
        }
    }

    const cart = useSelector((state)=>state.cartReducer.cart)
    const cartItems = cart.cartItems

    const [product] = useState({
        name: "Computer Table",
        price: 10,
        description: "facebook's product"
      })
    
      const makePayment = async (token, addresses) => {
        
        const response = await fetch('http://localhost:9090/checkout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, product }),
          });
          
          const data = await response.json();
          
      }


    return (
        <div>
            <h1>CartPage</h1>
        <div>
            <h1>Total Price: {cart.totalPrice} </h1>
            <button onClick={navigateToCheckout}>Checkout</button>
        </div>

        {/* <Link to="/Checkout" />     */}
        

        <div className="home">   
            <div className="buyer">
                {
                    cartItems && cartItems.map( (item) => {
                        return <CartItem item={item} />
                    } )
                }
            </div>
        </div>

        </div>
    )
}

export default CartPage
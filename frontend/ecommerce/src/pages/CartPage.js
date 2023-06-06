import { useSelector } from "react-redux"
import { useState } from "react"
import CartItem from "../component/CartItem"
import StripeCheckout from 'react-stripe-checkout';
import {useNavigate} from 'react-router-dom'

function CartPage(){

    const navigate = useNavigate()
    const navigateToCheckout = () => {
        navigate('/Checkout')
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
        <div className="home">   
            <div className="buyer">
                {
                    cartItems && cartItems.map( (item) => {
                        return <CartItem item={item} />
                    } )
                }
            </div>
        </div>
        <div>
            <h1>Total Price: {cart.totalPrice} </h1>
        </div>

        {/* <Link to="/Checkout" />     */}
        <button style={{position:"absolute", left:"0px", bottom:"10px"}} onClick={navigateToCheckout}>Checkout</button>

        </div>
    )
}

export default CartPage
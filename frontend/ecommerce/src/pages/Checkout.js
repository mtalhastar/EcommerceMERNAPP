import { useState } from "react"
import {useSelector} from 'react-redux'
import StripeCheckout from 'react-stripe-checkout';
import { useNavigate } from "react-router-dom";
function Checkout(){
    const navigate = useNavigate()
    let navigateToCart = () => {
        navigate('/CartPage')
    }
    const cart = useSelector((state)=>state.cartReducer.cart)
    
    const createOrder = async (order) => {
        
        try {
          const token = JSON.parse(localStorage.getItem('token'));
            // Assuming you have the product ID from the event target
          const response = await fetch(`/order/createOrder`, {
          method: 'POST',
          headers: {
             'token':token,
             'Content-Type': 'application/json',
          },
          body:JSON.stringify(order)
        });
        const data = await response.json();
        response.ok ? alert("Order Accepted") : alert("Order Not Accepted")
      } catch (error) {
        // Handle network or other errors
        console.error('Error:', error);
      }
    };



    const [product] = useState({
        name: "Computer Table",
        price: 10,
        description: "facebook's product"
      })

      const makePayment = async (token, addresses) => {
        
        const response = await fetch('/checkout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, product }),
          });
          
          const data = await response.json();
          console.log(data)

          if(data){
            let products = cart.cartItems.map((item)=>{
                
                return {
                    product:item.id,
                    quantity:item.quantity
                }
            })

            let address = "Hayatabad"
            console.log(address)
            let amount = cart.totalPrice
            let status = "pending"
            let deliveryDate = "5 Days"

            // products,amount,status,address,deliveryDate

            let order = {
                products,
                amount,
                status,
                address,
                deliveryDate
            }
            console.log(order)
            
            createOrder(order)
           
            alert("Payment Successfull")
          }


          
      }


    return (
        <div>
            <h1 style={{color:"white"}}>Checkout</h1>
            <div style={{margin:"20px", marginLeft:"0px"}}>
                <p style={{color:"white"}}><b>Payment Method:</b> Stripe</p>
                <p style={{color:"white"}}><b>Total Amount: </b>{cart.totalPrice}</p>
            </div>
            <div>
                 <button style={{position:"absolute", left:"-1050px", top:"250px"}} onClick={navigateToCart}>Back</button>
                <StripeCheckout
                stripeKey="pk_test_51N7zHbGB2OeWYDkD9yWvcbD1F7N5FXp2qMsC53cNTwx5y8SVNWWkHju32qvEHuj270k5yyTzKobYewyAIHfBSYO900J2UNkslG" 
                token={makePayment}
                name="Buyer's Checkout"
                amount={cart.totalPrice * 100}
                billingAddress
                shippingAddress
                style={{position:"absolute", left:"-1050px", top:"200px"}}
                />
            </div>
        </div>
    )
}

export default Checkout
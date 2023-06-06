import { useDispatch } from "react-redux"
import { useState } from "react"
import { removeProductFromCart, updateProductQuantity } from "../actions/action"

function CartItem({item})
{

    const [quantity,setQuantity] = useState(item.quantity)

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value)
        
    }
    const dispatch = useDispatch()
    const removeFromCart = () => {
        dispatch(removeProductFromCart(item))
    }

    const UpdateProduct = () => {
        dispatch(updateProductQuantity(item,quantity))
    }    
        
    
    return (
        
            <div className="buyer-details">
                <p>{item.name}</p>
                <p>{item.price}</p>
                <p>{item.quantity}</p>
                <img src={item.image} alt="img"></img>
                
                <label>quantity</label>
                <input type="number" value={quantity} onChange={handleQuantityChange} />
                    <button className="a" onClick={UpdateProduct}>Update</button>
                    <button className='a' onClick={removeFromCart}>Delete</button>
            </div>
        
    )
}


export default CartItem
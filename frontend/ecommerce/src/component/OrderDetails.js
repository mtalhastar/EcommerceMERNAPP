import 'material-symbols';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import 'material-symbols'
import '../index.css'
import { useSelector,useDispatch } from 'react-redux';
import { incrementCount} from '../actions/action';
import { useState,useEffect,useContext } from 'react'

const OrderDetails = ({  order  }) => {
const selector =useSelector((state)=>state.reducer)
const [role, setRole] = useState('default');
const dispatch = useDispatch()
const [status,orderStatus]=useState('')
const [err,setError]=useState('')


   useEffect(() => {
       
       const user = localStorage.getItem('user');
      if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setRole(parsedUser.role);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    }
  },[selector]);


const updateInfo = async(e) => {

         const application ={
            status:status
         }
         const token = JSON.parse(localStorage.getItem('token'))
         const update = await fetch('/delivery/UpdateDeliveryStatus/' + order._id, {
            method: 'PUT',
            body: JSON.stringify(application),
            headers: {
                'Content-Type': 'application/json'
                ,'token':token
            }
        })
        if(update.ok){
            dispatch(incrementCount())
        }
    }

 const handleOptionChange = (event) => {
     orderStatus(event.target.value);
 };


 
const AcceptOrder = async (e) => {
    e.preventDefault()
    try {
      const token = JSON.parse(localStorage.getItem('token'));
        // Assuming you have the product ID from the event target
      const response = await fetch(`/delivery/acceptOrder/`+order._id, {
      method: 'POST',
      headers: {
         'token':token,
         'Content-Type': 'application/json',
      },
      body:JSON.stringify(order)
    });
    if(response.ok){
 
    dispatch(incrementCount())
    }else{
    setError('Already Accepted By Some Rider')
    }
  } catch (error) {
    // Handle network or other errors
    console.error('Error:', error);
  }
};

return (
        <div className="buyer-details">
            <h1>Order</h1>
            <p><strong>Buyer: </strong>{order.user.username}</p>
            {order.products.map((productz, index) => (
           <div key={index}>
            <p><strong>Product: </strong> {productz.product.name}</p>
            <p><strong>Quantity: </strong> {productz.quantity}</p>
           </div>
           ))}
            <p><strong>Status: </strong>{order.status}</p>
            <p><strong>Address: </strong>{order.address}</p>
            <p><strong>Amount: </strong>{order.amount}</p>
            {role==='admin' &&(
              <div>
           <label className="label1">Change Status</label>
           <select className="dropdown1" onChange={handleOptionChange}>
              
            <option value="cancelled">cancelled</option>
               
           </select>
           </div>
           )}
           {role==='admin' &&
        <button className='a' onClick={updateInfo} >Update</button>
           }
        {role==='rider' &&
        <button className='a' onClick={AcceptOrder}>AcceptOrder</button>
        }

        <p>{err}</p>
        </div>
    )
}

export default OrderDetails
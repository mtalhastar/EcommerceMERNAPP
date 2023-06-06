import 'material-symbols';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import 'material-symbols'
import '../index.css'
import { useSelector,useDispatch } from 'react-redux';
import { incrementCount} from '../actions/action';
import { useState,useEffect,useContext } from 'react'

const DeliveryDetails = ({  delivery  }) => {

const selector =useSelector((state)=>state.reducer)
const [role, setRole] = useState('default');
const dispatch = useDispatch()
const [status,orderStatus]=useState('')


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
         const update = await fetch('/delivery/UpdateDeliveryStatus/' + delivery.order._id, {
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



return (
        <div className="buyer-details">
            <h1>Delivery</h1>
            <p><strong>Rider: </strong>{delivery.user.username}</p>
            <p><strong>Status: </strong>{delivery.status}</p>
            <p><strong>Address: </strong>{delivery.address}</p>
            <p><strong>Amount: </strong>{delivery.amount}</p>
                <label className="label1">Change Status</label>
            <div>
           <select className="dropdown1" onChange={handleOptionChange}>
            <option value="">Select Option</option>
            <option value="shipped">shipped</option>
            <option value="delivered">delivered</option>
           </select>
           </div>
        
        <button className='a' onClick={updateInfo} >Update</button>
        </div>
    )
}

export default DeliveryDetails
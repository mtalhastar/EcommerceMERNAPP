import 'material-symbols';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import 'material-symbols'
import '../index.css'
import { useSelector,useDispatch } from 'react-redux';
import { incrementCount} from '../actions/action';
import { useState,useEffect,useContext } from 'react'
const UserCard = ({  user  }) => {

     
     const dispatch = useDispatch()
      
const DeleteTheUser = async (e) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
        // Assuming you have the product ID from the event target
      const response = await fetch(`/user/deleteUser/`+ user._id, {
      method: 'DELETE',
      headers: {
         'token':token,
         'Content-Type': 'application/json',
      },
    });
    if(response.ok){
      dispatch(incrementCount())
    }
  
  }catch (error) {
  
    // Handle network or other errors
    console.error('Error:', error);
  }
};

   return (
        <div className="buyer-details">
            <p><strong>Email: </strong>{user.username}</p>
            <p><strong>name: </strong>{user.name}</p>
            <p><strong>role: </strong>{user.role}</p>
            <img src={user.images} alt="img"></img>
        <button className="a" onClick={DeleteTheUser}>
         Delete
        </button>
        </div>
    )
}

export default UserCard
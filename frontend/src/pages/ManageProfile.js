import React, { useEffect, useState } from 'react';
import {fetchUserProfile} from '../actions/action'
import {useDispatch,useSelector} from 'react-redux';

import { incrementCount} from '../actions/action';


const ManageProfile = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImages] = useState('');
  const dispatch =useDispatch()
  const selector =useSelector((state)=>state.reducer)
  const profile = useSelector((state) => state.FetchProfile.profile);
  const [click,setClick]=useState(false)
 

     useEffect(() => {
    dispatch(fetchUserProfile());
  }, [selector]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
 
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

const handleImageChange = (event) => {
    setImages(event.target.value);
  };


  const handleSubmit = async(event) => {
    event.preventDefault()
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const user={name:name,images:image,password:password,username:email}
        // Assuming you have the product ID from the event target
      const response = await fetch(`/user/updateProfile`, {
      method: 'PUT',
      headers: {
         'token':token,
         'Content-Type': 'application/json',
      },
      body:JSON.stringify(user)
    });
    if(response.ok){
     setName('')
     setImages('')
     setEmail('')
     setPassword('')   
     setClick(false)
    dispatch(incrementCount())
    }
  } catch (error) {
    // Handle network or other errors
    console.error('Error:', error);
  }
    setClick(false)
  };

  return (
    <div className='Profile'>
      <h1>Profile</h1>

      {profile &&(
      <div >
      <img src={profile.images} alt='image'></img>
      <h3><strong>Name:</strong>{profile.name}</h3>
      <h3>Email:{profile.username}</h3>    
      <button class='a' onClick={()=>setClick(true)}>Edit</button> 
      </div>
      )}
      {click &&
       <div className='Adjust' >
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
      
        {/* <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label> */}
        <label>
          Password:
          <input type="text" value={password} onChange={handlePasswordChange} />
        </label>
        
        <label>
          image:
          <input type="text" value={image} onChange={handleImageChange} />
        </label>

        <button type="submit">Save</button>
      </form>
       </div>
       }
    </div>
  );
};

export default ManageProfile;

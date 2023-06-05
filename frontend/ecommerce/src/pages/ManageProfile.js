import React, { useEffect, useState } from 'react';
import {fetchUserProfile} from '../actions/action'
import {useDispatch,useSelector} from 'react-redux';


const ManageProfile = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('j');
  const [password, setPassword] = useState('');
  const [image, setImages] = useState('');
  const dispatch =useDispatch()
  const selector =useSelector((state)=>state.reducer)
  const profile = useSelector((state) => state.FetchProfile.profile);
  const [click,setClick]=useState(false)
 
     useEffect(() => {
    dispatch(fetchUserProfile());
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform submission logic here (e.g., update profile details on the server)
    // ...
    console.log('Profile details updated!');
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
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>

        <button type="submit">Save</button>
      </form>
       }
    </div>
  );
};

export default ManageProfile;

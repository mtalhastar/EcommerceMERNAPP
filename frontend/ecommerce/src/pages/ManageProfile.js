import React, { useEffect, useState } from 'react';
import {fetchUserProfile} from '../actions/action'
import {useDispatch,useSelector} from 'react-redux';


const ProfilePage = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [bio, setBio] = useState('Hello, I am John Doe.');
  const dispatch =useDispatch()
  const selector =useSelector((state)=>state.reducer)
  const profile = useSelector((state) => state.FetchProfile.profile);

  useEffect(()=>[
       dispatch(fetchUserProfile)
   ],[selector])

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform submission logic here (e.g., update profile details on the server)
    // ...
    console.log('Profile details updated!');
  };

  return (
    <div>
      <h1>Profile</h1>
      <div className='Profile'>
         <img src={profile.image} alt='image'></img>
         <h3><strong>Name:</strong>{profile.name}</h3>
         <h3>Email:{profile.username}</h3>
         <button>Edit</button>
      </div>
       
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
        <br />
        <label>
          Bio:
          <textarea value={bio} onChange={handleBioChange} />
        </label>
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ProfilePage;

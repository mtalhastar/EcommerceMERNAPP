import { useEffect, useState,useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {fetchUsers} from '../actions/action'
import UserCard from '../component/UserCard'

const ManageUsers = () => {
 
    const dispatch = useDispatch();
    const userss = useSelector((state) => state.userReducer.users);
    const selector =useSelector((state)=>state.reducer)
    
    useEffect(() => {
    dispatch(fetchUsers());
    console.log(userss)
    }, [selector]);


   
    return (
        <>
          <div className="home1">
         
            <div className='buyer'>
              <h1>User Management</h1>
                {
                  userss.users && userss.users.map((user) => (
                    <UserCard key={user._id} user={user} />
                )) 
                }
            </div>
           
        </div>
       </>
    )
}

export default ManageUsers
import { ro } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
const NavBar =()=>{

   const selector =useSelector((state)=>state.reducer)
   const [role, setRole] = useState('default');

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

   const resetToken=()=>{
    localStorage.setItem('token',{})
    localStorage.setItem('user',{})
    alert('SignOut Successful')
    setRole('default')
   }

 return(
 <header>
        <nav>
        <div className="nav-header"> <span className="nav-logo">Job Portal</span> </div>
      
        <ul className="nav-links">         
            <li><Link to="/"><span>Login</span></Link></li>
            <li><Link to="/signUp"><span>Signup</span></Link></li>
            {role==='admin' &&
            <li ><Link to="/EvidencePage"><span>AdminPanel</span></Link></li>
            }
            <li><Link to="/GhostPage"><span>Products</span></Link></li>
            {role==='seller' &&
            <li ><Link to="/EvidencePage"><span>Seller</span></Link></li>
            }
            <li onClick={resetToken}><Link to="/"><span >Signout</span></Link></li>
        </ul>
       
         </nav>
</header>
    )
};
export default NavBar;
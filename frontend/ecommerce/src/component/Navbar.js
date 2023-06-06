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
        <div className="nav-header"> <span className="nav-logo">EcommerceApp</span> </div>
      
        <ul className="nav-links">         
            <li><Link to="/"><span>Login</span></Link></li>
            <li><Link to="/signUp"><span>Signup</span></Link></li>
            
            <li ><Link to="/EvidencePage"><span>Products</span></Link></li>
           
            {role==='seller' &&
            <li><Link to="/GhostPage"><span>ManageProducts</span></Link></li>
            }
            {role!=='buyer' &&
            <li><Link to="/ManageOrders"><span>ManageOrders</span></Link></li>
            }
            {/* {role==='seller' &&
            <li ><Link to="/EvidencePage"><span>Seller</span></Link></li>
            } */}
               {role==='admin' &&
            <li ><Link to="/ManageUser"><span>Manage Users</span></Link></li>
            }
            {role==='buyer' &&
            <li><Link to="/CartPage"><span>Cart</span></Link></li>
            }
              {role==='buyer' &&
            <li ><Link to="/MyOrders"><span>MyOrders</span></Link></li>
            }
            {role==='rider' &&
            <li ><Link to="/MyDelivery"><span>ManageDelivery</span></Link></li>
            }
            <li ><Link to="/ProfilePage"><img  class="nav-image" src='../imageuser.png'/></Link></li>
            {role!=='default' &&
            <li onClick={resetToken}><Link to="/"><span >Signout</span></Link></li>
            }
              
        </ul>
         </nav>
</header>
    )
};
export default NavBar;

import { useEffect,useState,useMemo} from "react"
import {Link} from 'react-router-dom'
import { incrementCount } from '../actions/action'; // Create this action later
import { useDispatch} from "react-redux";
const Login = () => {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError]=useState('');
  const dispatch=useDispatch();
 //  const history = useHistory();
  const handleUsername = (event) => {
    setusername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  
  const dispatcher=()=>{
    dispatch(incrementCount())
  }
  
  const handleSubmit = async(event) => {
    event.preventDefault();

      const user={username:username,password:password}
        const response = await fetch('/user/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            setusername('')
            setPassword('')
            setError('')
            localStorage.setItem('token',JSON.stringify(json.token))
            localStorage.setItem('user',JSON.stringify(json.founndUser))
            
            
    //          if (json.role === 'admin') {
    //    history.push('/admin'); // redirect to admin page if user is admin
    //  }   
            dispatcher()
            alert("Account LoggedIn Successfully")
        }
    // Handle form submission here
  };

  return (
    <div className="pad">
    <form onSubmit={handleSubmit}>
    <h1 className="nice">Welcome To Login Page</h1>
    <h3>
        Email:
        </h3>
        <input type="text" value={username} onChange={handleUsername} />
    <h3> Password: </h3>
        <input type="password" value={password} onChange={handlePasswordChange} />
      <button type="submit">Login</button>
       <a><Link to="/signUp">Create new Account? <span><strong>SignUp</strong></span></Link></a>
      <h3>{error}</h3>
    </form>
   </div>
  );
};

export default Login;
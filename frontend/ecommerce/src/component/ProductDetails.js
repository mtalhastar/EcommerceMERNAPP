import 'material-symbols';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import 'material-symbols'
import '../index.css'
import { useSelector,useDispatch } from 'react-redux';
import { incrementCount,addProductToCart} from '../actions/action';
import { useState,useEffect,useContext } from 'react'
const ProductDetails = ({  product , addProductsToCart }) => {

     const selector =useSelector((state)=>state.reducer)
     const [role, setRole] = useState('default');
     const [price,setPrice]=useState('')
     const [quantity,setTotalQuantity]=useState('')
     const [name,setName]=useState('')
     const [image,setImage]=useState('')
     const [SingleClick,setSingleClick]=useState(false)
     const flag=  localStorage.getItem('sellerPage',false)
     


    const [productQuantity, setQuantity] = useState(0)
    const AddToCart = () => {
      console.log(product,productQuantity)
        dispatch(addProductToCart(product,productQuantity))
    }
    

    const handleQuantityChange = (e) => {
    setQuantity(e.target.value) 
}

     console.log(flag)
      const dispatch = useDispatch()
      
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

   
    
const DeleteTheProduct = async (e) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
        // Assuming you have the product ID from the event target
      const response = await fetch(`/product/deleteProduct/`+ product._id, {
      method: 'DELETE',
      headers: {
         'token':token,
         'Content-Type': 'application/json',
      },
    });
    if(response.ok){
       dispatch(incrementCount())
    }
  } catch (error) {
    // Handle network or other errors
    console.error('Error:', error);
  }
};

const EditTheProduct = async (e) => {
    e.preventDefault()
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const products={name:name,image:image,price:price,totalQuantity:quantity}
        // Assuming you have the product ID from the event target
      const response = await fetch(`/product/updateProduct/`+product._id, {
      method: 'PUT',
      headers: {
         'token':token,
         'Content-Type': 'application/json',
      },
      body:JSON.stringify(products)
    });
    if(response.ok){
     setName('')
     setImage('')
     setPrice('')
     setTotalQuantity('')   
    setSingleClick(false)
    dispatch(incrementCount())
    }
  } catch (error) {
    // Handle network or other errors
    console.error('Error:', error);
  }
};
   return (
        <div className="buyer-details">
            <p><strong>Product: </strong>{product.name}</p>
            <p><strong>price: </strong>{product.price}</p>
            <p><strong>seller: </strong>{product.seller.name}</p>
            <img src={product.image} alt="img"></img>
        {/* <label className="label1">Change Status</label>
        <select className="dropdown1" onChange={handleOptionChange}>
            <option value="">Select Option</option>
            <option value="accepted">accepted</option>
            <option value="rejected">rejected</option>
        </select> */}
               <label>quantity</label>
              <input type="number" value={productQuantity} onChange={handleQuantityChange} placeholder='1'/>
       {role==='buyer' &&
        <button className='a' onClick={AddToCart} >AddToCart</button>
       }
      {role === 'admin' || flag === 'true' ? (
     <button className="a" onClick={DeleteTheProduct}>
      Delete
     </button>
     
      ) : null}
      {flag === 'true' ? (
       <button className="a" onClick={()=>setSingleClick(true)}>Edit</button>
       ) : null}

       {SingleClick &&
         
         <form  onSubmit={EditTheProduct}>

              <label className="label1">Name:</label>
         
            <input 
                type="text" 
                onChange={(e) => setName(e.target.value)}
                value={name} 
                placeholder='enter new Name:'
            />
             
            <label className="label1">Image:</label>
         
            <input 
                type="text" 
                onChange={(e) => setImage(e.target.value)}
                value={image} 
                placeholder='enter new Image:'
            />
        
            <label className="label1">Price:</label>
         
            <input 
                type="text" 
                onChange={(e) => setPrice(e.target.value)}
                value={price} 
                placeholder='enter new price'
            />
             
            <label className="label1">Quantity:</label>
         
            <input 
                type="text" 
                onChange={(e) => setTotalQuantity(e.target.value)}
                value={quantity} 
                placeholder='enter new Quantity:'
            />
            <button className="a">Done</button>
           
        </form>
       
       }
        </div>
    )
}

export default ProductDetails
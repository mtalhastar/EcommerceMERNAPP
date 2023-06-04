import { useEffect, useState,useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts,searchProducts } from '../actions/action';
import ProductDetails from '../component/ProductDetails'
import EvidenceForm from '../component/EvidenceForm'

const ProductsPage = () => {
 
    const dispatch = useDispatch();
    const products = useSelector((state) => state.productReducer.products);
    const search = useSelector((state) => state.productReducer.searchResults);
    const [searchValue,setsearchValue]=useState('')
    const [cartProducts,setcartProducts]=useState([])

  
    useEffect(() => {
    dispatch(fetchProducts());
    const interval = setInterval(() => {
        console.log(products)
      dispatch(fetchProducts());
    }, 5000);
    return () => {
      clearInterval(interval);
    };
    }, []);

    
    const searchProduct=(e)=>{
        if(e.target.value!==''){
         dispatch(searchProducts(e.target.value))
        } 
        setsearchValue(e.target.value)
    }
    

    const addProductsToCart=(product)=>{
        setcartProducts([...cartProducts,product])
    }

   
    return (
        <>
          <div className='searchDiv'>
                <input type='text' placeholder='Search Your Product' className='productSearch'  onChange={searchProduct}></input>
               </div>
          <div className="home">
            <div className='buyer'>
            
                {searchValue!=='' ? ( search && search.map((product) => (
                    <ProductDetails key={product._id} product={product} addProductsToCart={addProductsToCart}/>
                ))
                ):(
                  products && products.map((product) => (
                    <ProductDetails key={product._id} product={product} addProductsToCart={addProductsToCart}/>
                ))  
                )
                }
            </div>
            {/* <EvidenceForm /> */}
        </div>
       </>
    )
}

export default ProductsPage
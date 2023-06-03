import { useEffect, useState,useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../actions/action';
import ProductDetails from '../component/ProductDetails'
import EvidenceForm from '../component/EvidenceForm'

const ProductsPage = () => {
 
    const dispatch = useDispatch();
    const products = useSelector((state) => state.productReducer.products);
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

    
    const addProductsToCart=(product)=>{
        setcartProducts([...cartProducts,product])
    }

    // const deleteCartProducts=(product)=>{
    //     const newProducts= cartProducts.filter((e)=>{
    //         return e!=product;
    //     })
    //      setcartProducts(newProducts)
    // }
    return (
   
        <div className="home">
            <div className='buyer'>
                {products && products.map((product) => (
                    <ProductDetails key={product._id} product={product} addProductsToCart={addProductsToCart}/>
                ))}
            </div>
            {/* <EvidenceForm /> */}
        </div>
       
    )
}

export default ProductsPage
import { useEffect, useState } from 'react'

import ProductDetails from '../component/ProductDetails'
import EvidenceForm from '../component/EvidenceForm'

const ProductsPage = () => {
    
    const [products,setProducts]=useState([])
    const [cartProducts,setcartProducts]=useState([])
    useEffect(() => {
        const fetchApplications=async()=>{
       const token=JSON.parse(localStorage.getItem('token'))
            console.log(token)
            const response = await fetch('/product/getAllProduct',{
                method:'GET',
                token:token
            }
            )
            const json = await response.json()
            if (response.ok) {
                setProducts([...json])
            }else{
                alert('Unsuccessful')
            }
        }
        fetchApplications()
    },[])
    
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
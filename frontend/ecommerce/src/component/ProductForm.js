import { useState,useEffect,useContext } from "react"

const ProductForm = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [totalQuantity, setTotalQuantity] = useState('')
     const [error, setError] = useState('')
    


    const handleSubmit = async (e) => {
        e.preventDefault()
        const token =JSON.parse(localStorage.getItem('token'))
        const product = {name:name, price:price,image:image,totalQuantity:totalQuantity}
      
        const response = await fetch('/product/addProduct', {
            method: 'POST',
            body: JSON.stringify(product),
            headers: {
                'token':token,
                'Content-Type': 'application/json'
            }
        })
       
        const json = await response.json()
      
        if (!response.ok) {
            setError(json.error)
            alert('Not Authorized as Employee or Admin')
        }

        if (response.ok) {
            setName('')
            setPrice('')
            setImage('')
            setTotalQuantity('')
            setError('')
        }

    }


    return (
        <>
        <form className="create" onSubmit={handleSubmit}>
            <h3 className="h31">Add Products</h3>

            <label className="label1">Name:</label>
            <input 
                type="text" 
                onChange={(e) => setName(e.target.value)}
                value={name} 
                required
            />
               <label className="label1">Price:</label>
            <input 
                type="text" 
                onChange={(e) => setPrice(e.target.value)}
                value={price} 
                required
            />
              <label className="label1">Image:</label>
            <input 
                type="text" 
                onChange={(e) => setImage(e.target.value)}
                value={image} 
                required
            />
              <label className="label1">Quantity:</label>
            <input 
                type="text" 
                onChange={(e) => setTotalQuantity(e.target.value)}
                value={totalQuantity} 
                required
            />
        
            <button type="submit">Submit</button>
            <h1>{error}</h1>

        </form>
         
        </>
    )
}

export default ProductForm
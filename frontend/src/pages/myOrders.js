import { useEffect, useState,useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts,searchProducts,AddToCart,fetchOrders,fetchOwnOrders } from '../actions/action';
import OrderDetails from '../component/OrderDetails'


const MyOrders = () => {
 
    const dispatch = useDispatch();

    const myOrders =useSelector((state) => state.myOrderReducer.myOrders);
    const selector = useSelector((state) => state.reducer);
  
    useEffect(() => {
    dispatch(fetchOwnOrders());
    console.log(myOrders)
    const interval = setInterval(() => {
      dispatch(fetchOwnOrders());
    }, 5000);
    return () => {
      clearInterval(interval);
    };
    }, [selector]);

    return (
        <>  
          <div className="home1">
            <div className='buyer'>
            <h1>Orders</h1>
                {
                  myOrders && myOrders.map((order) => (
                    <OrderDetails key={order._id} order={order} />
                ))  
                }
            </div>
            {/* <EvidenceForm /> */}
        </div>
       </>
    )
}

export default MyOrders
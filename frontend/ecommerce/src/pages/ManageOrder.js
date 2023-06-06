import { useEffect, useState,useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts,searchProducts,AddToCart,fetchOrders } from '../actions/action';
import OrderDetails from '../component/OrderDetails'


const ManageOrder = () => {
 
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orderReducer.orders);
    const selector = useSelector((state) => state.reducer);
    useEffect(() => {
    dispatch(fetchOrders());
    const interval = setInterval(() => {
        console.log(orders)
      dispatch(fetchOrders);
       
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
                  orders && orders.map((order) => (
                    <OrderDetails key={order._id} order={order} />
                ))  
                }
            </div>
            {/* <EvidenceForm /> */}
        </div>
       </>
    )
}

export default ManageOrder
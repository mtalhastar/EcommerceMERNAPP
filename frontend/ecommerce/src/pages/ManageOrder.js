import { useEffect, useState,useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts,searchProducts,AddToCart,fetchOrders } from '../actions/action';
import OrderDetails from '../component/OrderDetails'


const ManageOrder = () => {
 
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orderReducer.orders);
  
    useEffect(() => {
    dispatch(fetchOrders());
    const interval = setInterval(() => {
        console.log(orders)
      dispatch(fetchOrders);
       
    }, 5000);
    return () => {
      clearInterval(interval);
    };
    }, []);

    return (
        <>  
          <div className="home1">
            <div className='buyer'>
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
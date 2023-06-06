import { useEffect, useState,useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {fetchOrders,fetchMyDelivery} from '../actions/action';
import DeliveryDetails from '../component/DeliveryDetails'


const MyDelivery = () => {
 
    const dispatch = useDispatch();
    const deliveries =useSelector((state) => state.myDeliveryReducer.mydeliveries);
    const selector = useSelector((state) => state.reducer);
  

    useEffect(() => {
    dispatch(fetchMyDelivery());
    
    const interval = setInterval(() => {
       
      dispatch(fetchMyDelivery());
       
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
                  deliveries.delivery && deliveries.delivery.map((delivery) => (
                    <DeliveryDetails key={delivery._id} delivery={delivery} />
                ))  
                }
            </div>
            {/* <EvidenceForm /> */}
        </div>
       </>
    )
}

export default MyDelivery
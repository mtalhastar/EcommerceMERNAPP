export const incrementCount = () => ({
  type: 'INCREMENT_COUNT',
});
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('/product/getAllProduct', {
        method: 'GET',
      });

      if (response.ok) {
        const json = await response.json();
        dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: json });
      } else {
        dispatch({ type: 'FETCH_PRODUCTS_FAILURE' });
      }
    } catch (error) {
      dispatch({ type: 'FETCH_PRODUCTS_FAILURE' });
    }
  };
};

// searchActions.js
export const searchProducts = (value) => {
  return {
    type: 'SEARCH_PRODUCTS',
    payload: value,
  };
};

export const fetchSellerProducts = () => {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const response = await fetch('/product/getSellerProduct', {
        method: 'GET',
        headers:{'token':token},
      });

      if (response.ok) {
        const json = await response.json();
        dispatch({ type: 'FETCH_SELLER_PRODUCTS_SUCCESS', payload: json });
      } else {
        dispatch({ type: 'FETCH_SELLER_PRODUCTS_FAILURE' });
      }
    } catch (error) {
      dispatch({ type: 'FETCH_SELLER_PRODUCTS_FAILURE' });
    }
  };
};


// actions.js
export const AddToCart = (productId, payload) => {
  return {
    type: 'ADD_PRODUCT',
    payload: payload,
    productId: productId,
  };
};
export const fetchUserProfile = () => {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const response = await fetch('/user/getUser', {
        method: 'GET',
        headers:{'token':token},
      });
      if (response.ok) {
        const json = await response.json();
        dispatch({ type: 'FETCH_PROFILE', payload: json });
      } else {
        dispatch({ type: 'FETCH_PROFILE_FAIL' });
      }
    } catch (error) {
      dispatch({ type: 'FETCH_PROFILE_FAIL' });
    }
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const response = await fetch('/user/all', {
        method: 'GET',
        headers:{'token':token},
      });
      if (response.ok) {
        const json = await response.json();
        dispatch({ type: 'FETCH_USER_SUCCESS', payload: json });
      } else {
        dispatch({ type: 'FETCH_USER_FAILURE' });
      }
    } catch (error) {
      dispatch({ type: 'FETCH_USER_FAILURE' });
    }
  };
};

export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const response = await fetch('/order/getorder', {
        method: 'GET',
        headers:{'token':token},
      });
      if (response.ok) {
        const json = await response.json();
        dispatch({ type: 'FETCH_ORDER_SUCCESS', payload: json });
      } else {
        dispatch({ type: 'FETCH_ORDER_FAILURE' });
      }
    } catch (error) {
      dispatch({ type: 'FETCH_USER_FAILURE' });
    }
  };
};

export const fetchOwnOrders = () => {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const response = await fetch('/order/getOrderbyRole', {
        method: 'GET',
        headers:{'token':token},
      });
      if (response.ok) {
        const json = await response.json();
        dispatch({ type: 'FETCH_MYORDER_SUCCESS', payload: json });
      } else {
        dispatch({ type: 'FETCH_MYORDER_FAILURE' });
      }
    } catch (error) {
      dispatch({ type: 'FETCH_MYORDER_FAILURE' });
    }
  };
};

export const fetchMyDelivery = () => {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const response = await fetch('/delivery/myDeliveries', {
        method: 'GET',
        headers:{'token':token},
      });
      if (response.ok) {
        const json = await response.json();
        dispatch({ type: 'FETCH_MYDELIVERY_SUCCESS', payload: json });
      } else {
        dispatch({ type: 'FETCH_MDELIVERY_FAILURE' });
      }
    } catch (error) {
      dispatch({ type: 'FETCH_MYDELIVERY_FAILURE' });
    }
  };
};


export const fetchBuyerCart = () => {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const response = await fetch('/cart/', {
        method: 'GET',
        token:token
      });

      if (response.ok) {
        const json = await response.json();
        dispatch({ type: 'FETCH_BUYER_CART_SUCCESS', payload: json });
      } else {
        dispatch({ type: 'FETCH_BUYER_CART_FAILURE' });
      }
    } catch (error) {
      dispatch({ type: 'FETCH_BUYER_CART_FAILURE' });
    }
  };
}
export const addProductToCart = (product, quantity) => {
  return (dispatch) => {
    try {
      dispatch({
        type: 'ADD_PRODUCT_TO_CART_SUCCESS',
        payload: {
          product,
          quantity
        }
      });
    } catch (error) {
      dispatch({ type: 'ADD_PRODUCT_TO_CART_FAILURE' });
    }
  };
};

export const removeProductFromCart = (item) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'REMOVE_PRODUCT_FROM_CART_SUCCESS',
        payload: {
          item
        }
      });
    } catch (error) {
      dispatch({ type: 'REMOVE_PRODUCT_FROM_CART_FAILURE' });
    }
  }
}

export const updateProductQuantity = (item, quantity) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'UPDATE_PRODUCT_QUANTITY_SUCCESS',
        payload: {
          item,
          quantity
        }
      });
    } catch (error) {
      dispatch({ type: 'UPDATE_PRODUCT_QUANTITY_FAILURE' });
    }
  }
}

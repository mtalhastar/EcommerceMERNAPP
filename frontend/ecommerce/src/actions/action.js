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
      const response = await fetch('/order/getorder', {
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



export const incrementCount = () => ({
  type: 'INCREMENT_COUNT',
});
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const response = await fetch('/product/getAllProduct', {
        method: 'GET',
        headers:{'token':token},
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
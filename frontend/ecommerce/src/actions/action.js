export const incrementCount = () => ({
  type: 'INCREMENT_COUNT',
});
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const response = await fetch('/product/getAllProduct', {
        method: 'GET',
        token:token
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

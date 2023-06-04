import { createStore, combineReducers,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
const initialState = {
  count: 0,
  products: [],
  loading: true,
  error: false,
  searchResults:[]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT_COUNT':
      return {
        ...state,
        count: state.count + 1,
      };
    default:
      return state;
  }
};
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_SUCCESS':
      console.log('FETCH_PRODUCTS_SUCCESS action:', action);
      console.log('Old state:', state);
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: false,
      };
    case 'FETCH_PRODUCTS_FAILURE':
      console.log('FETCH_PRODUCTS_Fail action:', action);
      console.log('Old state:', state);
      return {
        ...state,
        products: [],
        loading: false,
        error: true,
      };
    case 'SEARCH_PRODUCTS':
      const searchText = action.payload;
      const searchResults = state.products.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
      return {
        ...state,
        searchResults:searchResults,
      };
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  // Add other reducers here if needed
  reducer,
  productReducer
});

const store = createStore(rootReducer,applyMiddleware(thunk)); // Pass rootReducer directly

export default store;

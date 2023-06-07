import { createStore, combineReducers,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
const initialState = {
  count: 0,
  products: [],
  loading: true,
  error: false,
  searchResults:[],
  sellerProducts:[],
  profile:{
   images:'',
   name:'',
   username:''
  },
  cart:{
    cartItems:[],
   totalPrice:0
  }

};

const userInitialState={
  users:[]
}

const orderInitialState={
  orders:[],
  myOrders:[]
}

const cartInitialState={
  cartProducts:[],
  cartProductsids:[]
}

const deliveryInitialState={
   mydeliveries:[]
}

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


const SellerProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_SELLER_PRODUCTS_SUCCESS':
      console.log(state)
      return {
        ...state,
        sellerProducts: action.payload,
        loading: false,
        error: false,
      };
    case 'FETCH_SELLER_PRODUCTS_FAILURE':
      return {
        ...state,
        sellerProducts: [],
        loading: false,
        error: true,
      }; 
    default:
      return state;
  }
};

const FetchProfile = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PROFILE':
      return {
        ...state,
        profile: action.payload,
        loading: false,
        error: false,
      };
    case 'FETCH_PROFILE_FAIL':
      return {
        ...state,
        profile: {},
        loading: false,
        error: true,
      }; 
    default:
      return state;
  }
};



const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case 'FETCH_USER_SUCCESS':
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: false,
      };
    case 'FETCH_USER_FAILURE':
      return {
        ...state,
        users: [],
        loading: false,
        error: true,
      };
 
    default:
      return state;
  }
};



const orderReducer = (state = orderInitialState, action) => {
  switch (action.type) {
    case 'FETCH_ORDER_SUCCESS':
      return {
        ...state,
        orders: action.payload,
        loading: false,
        error: false,
      };
    case 'FETCH_ORDER_FAILURE':
      return {
        ...state,
        orders: [],
        loading: false,
        error: true,
      };
 
    default:
      return state;
  }
};

const myOrderReducer = (state = orderInitialState, action) => {

  switch (action.type) {
    case 'FETCH_MYORDER_SUCCESS':
      return {
        ...state,
        myOrders: action.payload,
        loading: false,
        error: false,
      };
    case 'FETCH_MYORDER_FAILURE':
      return {
        ...state,
        myOrders: [],
        loading: false,
        error: true,
      };
 
    default:
      return state;
  }
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT_TO_CART_SUCCESS': {
      const { product, quantity } = action.payload;

      const cart = state.cart;
      let differentSellerFound = false;

      if (cart && cart.cartItems) {
        cart.cartItems.forEach(item => {
          if (item.seller.name !== product.seller.name) {
            differentSellerFound = true;
            alert(`You can't add products from different sellers to the cart\n ${item.seller.name} can't be combined with ${product.seller.name}`);
            return; // Exit the loop when a different seller is found
          }
        });
      }

      if (differentSellerFound) {
        return state; // Return the original state if a different seller is found
      }

      // Calculate the price of the added product
      const productPrice = product.price * quantity;
      let name = product.name;
      let price = product.price;
      let id = product._id;
      let productQuantity = product.totalQuantity;
      let image = product.image;
      let seller = product.seller;

      // Update the cart state
      const updatedCartItems = [
        ...state.cart.cartItems,
        { id, name, image, price, seller, productQuantity, quantity }
      ];
      const updatedTotalPrice = state.cart.totalPrice + productPrice;

      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: updatedCartItems,
          totalPrice: updatedTotalPrice
        },
        loading: false,
        error: false,
      };
    }
   
    case 'REMOVE_PRODUCT_FROM_CART_SUCCESS': {
      const { item } = action.payload;
    
      // Filter out the item to be removed from cartItems
      const updatedCartItems = state.cart.cartItems.filter(
        cartItem => cartItem.name !== item.name
      );
    
      // Calculate the updated total price
      const updatedTotalPrice = state.cart.totalPrice - (item.price * item.quantity);
    
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: updatedCartItems,
          totalPrice: updatedTotalPrice
        },
        loading: false,
        error: false,
      };
    }

    case "UPDATE_PRODUCT_QUANTITY_SUCCESS": {
      const { item, quantity } = action.payload;
    
      // Map over the cartItems array and update the quantity of the matching item
      const updatedCartItems = state.cart.cartItems.map(cartItem => {
        if (cartItem.name === item.name) {
          return {
            ...cartItem,
            quantity: quantity
          };
        }
        return cartItem;
      });
    
      // Calculate the updated total price
      const updatedTotalPrice = state.cart.totalPrice + (item.price * (quantity - item.quantity));
    
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: updatedCartItems,
          totalPrice: updatedTotalPrice
        },
        loading: false,
        error: false,
      };
    }
    


    default:
      return state;
  }
};



const myDeliveryReducer =(state=deliveryInitialState,action)=>{
   switch (action.type) {
    case 'FETCH_MYDELIVERY_SUCCESS':
      return {
        ...state,
        mydeliveries: action.payload,
        loading: false,
        error: false,
      };
    case 'FETCH_MYDELIVERY_FAIL':
      return {
        ...state,
        mydeliveries: [],
        loading: false,
        error: true,
      };
 
    default:
      return state;
  }
}
// 'FETCH_USER_SUCCESS'
// 'FETCH_USER_FAILURE'
    
const rootReducer = combineReducers({
  // Add other reducers here if needed
  reducer,
  productReducer,
  SellerProductReducer,
  FetchProfile,
  userReducer,
  cartReducer,
  orderReducer,
  myOrderReducer,
  myDeliveryReducer  //fetchMyDelivery
});

const store = createStore(rootReducer,applyMiddleware(thunk)); // Pass rootReducer directly

export default store;

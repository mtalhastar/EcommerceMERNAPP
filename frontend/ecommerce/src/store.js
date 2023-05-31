import { createStore, combineReducers } from 'redux';

const initialState = {
  count: 0,
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

const rootReducer = combineReducers({
  // Add other reducers here if needed
  reducer,
});

const store = createStore(rootReducer); // Pass rootReducer directly

export default store;

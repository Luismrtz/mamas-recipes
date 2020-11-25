import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { recipeDeleteReducer, recipeFilterReducer, recipeListReducer, recipeSaveReducer } from '../reducer/recipeReducer';
//import Cookie from 'js-cookie';


// const payment = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : {};
// const shipping = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {};
// const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
// const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
// ?const initialState = { rList2: {a:'poop'}}; Still stands.  Just use when dealing with localstorage.
const reducer = combineReducers({
    rList: recipeListReducer,
    recipeSave: recipeSaveReducer,
    recipeDelete: recipeDeleteReducer,
    recipeFilter: recipeFilterReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//thunk: to run async operations inside action in redux
const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)));
export default store
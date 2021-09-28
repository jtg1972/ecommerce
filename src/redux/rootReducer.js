import {combineReducers} from 'redux';
import cartReducer from './Cart/cart.reducer';
import { productResolver } from './Products/product.resolvers';
import userReducer from './User/user.reducer';

export default combineReducers({user:userReducer,
  product:productResolver,  
  cart:cartReducer});
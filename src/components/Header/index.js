import React from 'react';
import {Link} from 'react-router-dom';
import './styles.scss';
import {useSelector,useDispatch} from 'react-redux';
import {signOutUserStart} from './../../redux/User/user.actions';
import AdminToolbar from '../AdminToolbar';
import { selectCartItemsCount } from '../../redux/Cart/cart.selectors';

const mapToState=(state)=>({
  currentUser:state.user.currentUser,
  totalNumCartItems:selectCartItemsCount(state)
});

const Header=(props)=>{
  const dispatch=useDispatch();
  const {currentUser,totalNumCartItems}=useSelector(mapToState);

  const signOut=()=>{
    dispatch(signOutUserStart());
  }
  return (
    <div className="hauto">
      <AdminToolbar></AdminToolbar>
      <header className="header">
        
        <div className="wrap">
          <div className="logo">
            
            <Link to="/">
              SimpleTut 
            </Link>
            
          </div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/search">Search</Link>
              </li>
            </ul>
          </nav>
          <div className="callToActions">
            <ul>
            <li>
              <Link to="/cart">
                Your Cart ({totalNumCartItems})
              </Link>
            </li>
            {currentUser && 
              [
                <li>
                  <Link to="/dashboard">My account</Link>
                </li>,
              
                <li>
                  <span onClick={()=>{
                    /*dispatch(setCurrentUser(null));
                    dispatch({type:userTypes.SIGN_IN_SUCCESS,
                      payload:false});
                    dispatch({type:userTypes.SIGN_UP_SUCCESS,
                        payload:false});*/
                    signOut();  
                    
                  }}>LogOut</span>
                </li>
              ]
            }
            
            
            {!currentUser &&
            
              
              [<li>
                <Link to="/registration">Register</Link>
              </li>,
              <li>
                <Link to="/login">Login</Link>
              </li>
              ]
            }
            </ul>
          </div>
        </div>

      </header>
    </div>
    
  );
}

export default Header;
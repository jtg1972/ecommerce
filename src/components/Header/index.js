import React from 'react';
import {Link} from 'react-router-dom';
import { auth } from '../../firebase/utils';
import './styles.scss';
import {useSelector,useDispatch} from 'react-redux';
import {setCurrentUser} from './../../redux/User/user.actions';
import userTypes from './../../redux/User/user.types';
const mapToState=({user})=>({
  currentUser:user.currentUser
});

const Header=(props)=>{
  const dispatch=useDispatch();
  const {currentUser}=useSelector(mapToState);
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            SimpleTut 
          </Link>
          
        </div>
        <div className="callToActions">
          {currentUser && (
            <ul>
              <li>
                <Link to="/dashboard">My account</Link>
              </li>
            
              <li>
                <span onClick={()=>{
                  dispatch(setCurrentUser(null));
                  dispatch({type:userTypes.SIGN_IN_SUCCESS,
                    payload:false});
                  dispatch({type:userTypes.SIGN_UP_SUCCESS,
                      payload:false});
                    
                  auth.signOut();
                }}>LogOut</span>
              </li>
            </ul>
          )}
          {!currentUser &&
          (<ul>
            
            <li>
              <Link to="/registration">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            
          </ul>)}
        </div>
      </div>

    </header>
    
  );
}

export default Header;
import React from 'react';
import {Link} from 'react-router-dom';
import './styles.scss';
import {useSelector,useDispatch} from 'react-redux';
import {signOutUserStart} from './../../redux/User/user.actions';
import AdminToolbar from '../AdminToolbar';

const mapToState=({user})=>({
  currentUser:user.currentUser
});

const Header=(props)=>{
  const dispatch=useDispatch();
  const {currentUser}=useSelector(mapToState);

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
          <div className="callToActions">
            {currentUser && (
              <ul>
                <li>
                  <Link to="/dashboard">My account</Link>
                </li>
              
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
    </div>
    
  );
}

export default Header;
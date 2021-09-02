import React from 'react';
import {Link} from 'react-router-dom';
import { auth } from '../../firebase/utils';
import './styles.scss';
import {useSelector} from 'react-redux';

const mapToState=({user})=>({
  currentUser:user.currentUser
});

const Header=(props)=>{
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
                <span onClick={()=>auth.signOut()}>LogOut</span>
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
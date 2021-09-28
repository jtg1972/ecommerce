import React from 'react'
import { useDispatch } from 'react-redux'
import Footer from '../components/Footer';
import { signOutUserStart } from '../redux/User/user.actions';
import Header from '../components/Header';
import VerticalNav from '../components/VerticalNav';
import {Link} from 'react-router-dom';
function AdminLayout(props) {
  const dispatch=useDispatch();
  const signOut=()=>{
    dispatch(signOutUserStart());
  };
  return (
    <div className="adminLayout">
      <Header {...props}/>
      <div className="controlPanel">
        <div className="sidebar">
          <VerticalNav>
            <ul>
              <li>
                <Link to="/admin">
                  Home
                </Link>
              </li>
              <li>
                <span className="signOut"
                  onClick={()=>signOut()}>
                  Sign Out    
                </span>                
              </li>
            </ul>

          </VerticalNav>

        </div>
        <div className="content">
          {props.children}
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default AdminLayout

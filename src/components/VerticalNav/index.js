import React from 'react'
import { useSelector } from 'react-redux';
import UserProfile from '../UserProfile';
import './styles.scss';

const mapState=({user})=>({
  currentUser:user.currentUser
});

function VerticalNav({children}) {
  const {currentUser}=useSelector(mapState);
  const configUserProfile={currentUser};
  return (
    <div className="verticalNav">
      <UserProfile {...configUserProfile}></UserProfile>
      <div className="menu">
        {children}
      </div>
    </div>
  );
}

export default VerticalNav

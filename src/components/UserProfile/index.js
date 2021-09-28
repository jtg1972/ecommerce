import React from 'react'
import {BiUserCircle} from 'react-icons/bi';
import './styles.scss'
function UserProfile({currentUser}) {
  return (
    <div className="profile">
      <BiUserCircle className="icon"/>
      <p>{currentUser.displayName}</p>

    </div>);

}

export default UserProfile

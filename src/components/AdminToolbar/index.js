import React from 'react'
import './styles.scss'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { checkUserIsAdmin } from '../../Utils';
const mapState=({user})=>({
  currentUser:user.currentUser
});
function AdminToolbar() {

  const {currentUser}=useSelector(mapState);
  const isAdmin=checkUserIsAdmin(currentUser);
  
  if(!currentUser || !isAdmin) return null;
  return (
    <div className="adminToolbar">
      <ul>
        <li>
          <Link to="/admin">My admin</Link>
        </li>
      </ul>
    </div>
  )
}

export default AdminToolbar

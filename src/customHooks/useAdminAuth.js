import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { checkUserSession } from '../redux/User/user.actions';
import { checkUserIsAdmin } from '../Utils';

const mapState=({user})=>({
  currentUser:user.currentUser
});


const useAdminAuth=(props)=>{
  const {currentUser}=useSelector(mapState);
  const history=useHistory();

  useEffect(()=>{
    //console.log("cuurles",currentUser.userRoles);
    if(!currentUser){
      history.push("/login");
    }
    if(currentUser && !checkUserIsAdmin(currentUser)){
      console.log("no es admin");
      history.push("/");
    }
  },[currentUser]);
  return currentUser;
}

export default useAdminAuth;


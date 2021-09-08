import {useSelector} from 'react-redux';
import {useEffect} from 'react';
const mapState=(state)=>{
  console.log(state);
  return ({
  currentUser:state.user.currentUser
  });
};


const useAuth=(history)=>{
  const {currentUser}=useSelector(mapState);
  console.log("history",history);
  useEffect(()=>{
    console.log("currentuser",currentUser);
    if(!currentUser){
      console.log("not current user");
      history.push("/login");
      
    }
    else{
      console.log("cu",currentUser);
      
    }
  },[currentUser]);
  return currentUser;
  
  
};

export default useAuth;
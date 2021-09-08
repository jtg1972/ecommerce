import {useAuth} from './../customHooks';
import {useHistory} from 'react-router-dom';
const WithAuth=(props)=>{
  const history=useHistory();
  console.log("userauth",useAuth(history));
  return (
    useAuth(history)!==null && props.children
  );
}
export default WithAuth;
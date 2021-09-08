import React,{useEffect, useState} from 'react';
import AuthWrapper from '../AuthWrapper';
import Button from '../forms/Button';
import FormInput from '../forms/FormInput';
import {auth} from './../../firebase/utils';
import './styles.scss';
import {useSelector,useDispatch} from 'react-redux';
import {resetPassword,resetAllAuthForms} from './../../redux/User/user.actions'
import {useHistory} from 'react-router-dom';
const mapState=({user})=>({
  resetPasswordSuccess:user.resetPasswordSuccess,
  resetPasswordError:user.resetPasswordError
});

const EmailPassword=(props)=>{
  const [email,setEmail]=useState("");
  const[errors,setErrors]=useState([]);

  const {resetPasswordError,resetPasswordSuccess}=useSelector(mapState);
  const dispatch=useDispatch();
  const history=useHistory();
  const configAuthWrapper={
    headline:"Email Password"
  };
  const resetForm=()=>{
    setEmail("");
    setErrors([]);
  }

  useEffect(()=>{
    if(resetPasswordSuccess){
      dispatch(resetAllAuthForms());
      history.push("/login");
      resetForm();
    }
  },[resetPasswordSuccess])

  useEffect(()=>{
    if(Array.isArray(resetPasswordError)&& resetPasswordError.length>0){
      setErrors(resetPasswordError);
    }
  },[resetPasswordError])

  const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch(resetPassword(email));
    // try{
      
    //   const config={
    //     url:'http://localhost:3000/login'
    //   };
      
    //   await auth.sendPasswordResetEmail(email,config);
      
    // }catch(e){
      
    //   setErrors([e.message]);
    // }

  }

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        {errors.length>0 && 
          (<ul>
            {errors.map((e,index)=>{
              return (
                <li key={index}>{e}</li>
              );
            })}
          </ul>)}
        <form onSubmit={(e)=>handleSubmit(e)}>
          <FormInput type="email" 
            placeholder="Email"
            value={email}
            handleChange={(e)=>setEmail(e.target.value)}/>
          <Button type="submit">Email Password</Button>
        </form>
      </div>
    </AuthWrapper>
  );
}

export default EmailPassword;
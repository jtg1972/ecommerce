import React,{useEffect, useState} from 'react';
import FormInput from './../forms/FormInput';
import Button from './../forms/Button';
import './styles.scss';
import AuthWrapper from '../AuthWrapper';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { signUpUserStart } from '../../redux/User/user.actions';

const mapState=({user})=>({
  currentUser:user.currentUser,
  userErr:user.userErr
});

const SignUp=(props)=>{
  const[displayName,setDisplayName]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[confirmPassword,setConfirmPassword]=useState("");
  const[errors,setErrors]=useState([]);
  const history=useHistory();
  const dispatch=useDispatch();
  const {currentUser,userErr}=useSelector(mapState);
  const resetForm=()=>{
    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors([]);
  }

  useEffect(()=>{
    if(currentUser){
      //dispatch(resetAllAuthForms());
      resetForm();
      history.push("/");
    }
  },[currentUser]);

  useEffect(()=>{
    if(Array.isArray(userErr) && userErr.length>0){
      setErrors(userErr);
    }
  },[userErr]);


  const handleFormSubmit=async(e)=>{
    e.preventDefault();
    console.log("entro dispatch");
    dispatch(signUpUserStart({
      displayName,
      email,
      password,
      confirmPassword
    }));
    
  }

  const configAuthWrapper={
    headline:"Sign Up"
  }
  return(
    <AuthWrapper {...configAuthWrapper}>
      
      <div className="formWrap">
        <ul>
          {errors.length>0 && 
            (
              errors.map((errit,index)=>
                <li key={index}>
                  {errit}
                </li>
              )
            )
          }
        </ul>
        <form onSubmit={handleFormSubmit}>
          <FormInput
            type="text"
            value={displayName}
            handleChange={(e)=>setDisplayName(e.target.value)}
            placeholder="Display Name"/>

          <FormInput
            type="email"
            value={email}
            handleChange={(e)=>setEmail(e.target.value)}
            placeholder="Email"/>

          <FormInput
            type="password"
            value={password}
            handleChange={(e)=>setPassword(e.target.value)}
            placeholder="Password"/>

          <FormInput
            type="password"
            value={confirmPassword}
            handleChange={(e)=>setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"/>
          <Button type="submit">Register</Button>
        </form>
      </div>
    </AuthWrapper>
  );
}

export default SignUp;
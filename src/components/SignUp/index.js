import React,{useState} from 'react';
import FormInput from './../forms/FormInput';
import Button from './../forms/Button';
import './styles.scss';
import {auth, handleUserProfile} from './../../firebase/utils';
import AuthWrapper from '../AuthWrapper';

const initialState={
  displayName:'',
  email:'',
  password:'',
  confirmPassword:'',
  errors:[]
};

const SignUp=(props)=>{
  const[state,setState]=useState(initialState);

  const handleFormSubmit=async(e)=>{
    e.preventDefault();
    const{displayName,email,password,confirmPassword}=state;
    if(password!==confirmPassword){
      const err=['Passwords dont match'];
      setState({...state,errors:err});
      return;
    }
  
    try{
      const {user}=await auth.createUserWithEmailAndPassword(email,password);
      await handleUserProfile(user,{displayName});
      setState(initialState);

    }catch(e){

    }
  }

  const configAuthWrapper={
    headline:"Sign Up"
  }
  return(
    <AuthWrapper {...configAuthWrapper}>
      
      <div className="formWrap">
        <ul>
          {state.errors.length>0 && 
            (
              state.errors.map((errit,index)=>
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
            value={state.displayName}
            handleChange={(e)=>setState({...state,displayName:e.target.value})}
            placeholder="Display Name"/>

          <FormInput
            type="email"
            value={state.email}
            handleChange={(e)=>setState({...state,email:e.target.value})}
            placeholder="Email"/>

          <FormInput
            type="password"
            value={state.password}
            handleChange={(e)=>setState({...state,password:e.target.value})}
            placeholder="Password"/>

          <FormInput
            type="password"
            value={state.confirmPassword}
            handleChange={(e)=>setState({...state,confirmPassword:e.target.value})}
            placeholder="Confirm Password"/>
          <Button type="submit">Register</Button>
        </form>
      </div>
    </AuthWrapper>
  );
}

export default SignUp;
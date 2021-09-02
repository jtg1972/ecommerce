import React,{useState} from 'react';
import AuthWrapper from '../AuthWrapper';
import Button from '../forms/Button';
import FormInput from '../forms/FormInput';
import {auth} from './../../firebase/utils';
import './styles.scss';

const initialState={
  email:'',
  errors:[]
};

const EmailPassword=(props)=>{
  const [state,setState]=useState(initialState);
  const configAuthWrapper={
    headline:"Email Password"
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const {email}=state;
      const config={
        url:'http://localhost:3000/login'
      };
      console.log("email",email);
      await auth.sendPasswordResetEmail(email,config);
      console.log("password reset");
    }catch(e){
      const err=['Email not found. Please try again'];
      setState({...state,errors:err})
    }

  }

  const {errors}=state;

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
            value={state.email}
            handleChange={(e)=>setState({...state,email:e.target.value})}/>
          <Button type="submit">Email Password</Button>
        </form>
      </div>
    </AuthWrapper>
  );
}

export default EmailPassword;
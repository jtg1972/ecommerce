import React,{useState} from 'react';
import Button from './../forms/Button';
import './styles.scss';
import {signInWithGoogle,auth} from './../../firebase/utils';
import FormInput from './../forms/FormInput';
import AuthWrapper from './../AuthWrapper';
import {Link} from 'react-router-dom';

const initialState={
  email:'',
  password:''
}

const SignIn=(props)=>{
  const [state,setState]=useState(initialState);

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const {email,password}=state;
    try{
      await auth.signInWithEmailAndPassword(email,password);
      setState(initialState);
    }catch(e){
      console.log(e);
    }
  }

  const configAuthWrapper={
    headline:'LogIn'
  }
  
  return (
    <AuthWrapper {...configAuthWrapper}>    
      <div className="formWrap">
        <form onSubmit={handleSubmit}>
          <FormInput 
            type="email"
            value={state.email}
            handleChange={e=>setState({...state,email:e.target.value})}
            placeholder="Email"
          />
          <FormInput 
            type="password"
            value={state.password}
            handleChange={e=>setState({...state,password:e.target.value})}
            placeholder="Password"
          />
          <Button type="submit">Login</Button>

          <div className="socialSignin">
            <div className="row">
              <Button type="button"
                onClick={signInWithGoogle}>
                Sign in with Google
              </Button>

            </div>

          </div>
          <div className="links">
            <Link to="/recovery">Reset password</Link>
          </div>
        </form>
        

      </div>
    </AuthWrapper>
  );

}

export default SignIn;
import React,{useState,useEffect} from 'react';
import Button from './../forms/Button';
import './styles.scss';
import FormInput from './../forms/FormInput';
import AuthWrapper from './../AuthWrapper';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {emailSignInStart,googleSignInStart, resetUserState} from './../../redux/User/user.actions';

const mapState=({user})=>({
  currentUser:user.currentUser,
  signInError:user.signInError,
  googleError:user.googleError
});

const SignIn=(props)=>{
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const[errors,setErrors]=useState([]);
  const history=useHistory();  
  const dispatch=useDispatch();
  const {currentUser,signInError,googleError}=useSelector(mapState);
  const resetForm=()=>{
    setEmail("");
    setPassword("");
    setErrors([]);
  };

  useEffect(()=>{
    dispatch(resetUserState());
    setErrors([]);
  },[]);

  useEffect(()=>{
    console.log("sisucc",currentUser);
    if(currentUser){
      resetForm();
      history.push("/");
    }

  },[currentUser]);

  useEffect(()=>{
    console.log("sie",signInError);
    if(Array.isArray(signInError) && signInError.length>0){
      setErrors(signInError);
    }
  },[signInError]);

  useEffect(()=>{
    if(Array.isArray(googleError) && googleError.length>0){
      setErrors(googleError);
    }
  },[googleError]);



  const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch(emailSignInStart({email,password}));
    
  }

  const handleGoogleSignIn=()=>{
    dispatch(googleSignInStart());
  }

  const configAuthWrapper={
    headline:'LogIn'
  }
  
  return (
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
        <form onSubmit={handleSubmit}>
          <FormInput 
            type="email"
            value={email}
            handleChange={e=>setEmail(e.target.value)}
            placeholder="Email"
          />
          <FormInput 
            type="password"
            value={password}
            handleChange={e=>setPassword(e.target.value)}
            placeholder="Password"
          />
          <Button type="submit">Login</Button>

          <div className="socialSignin">
            <div className="row">
              <Button type="button"
                onClick={handleGoogleSignIn}>
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
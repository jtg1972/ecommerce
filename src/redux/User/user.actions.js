import userTypes from './user.types';
import {auth} from './../../firebase/utils';
import {handleUserProfile,GoogleProvider} from './../../firebase/utils';


export const setCurrentUser=(user)=>({
  type:userTypes.SET_CURRENT_USER,
  payload:user
});

export const signInUser=({email,password})=>
  async dispatch=>{
    try{
      await auth.signInWithEmailAndPassword(email,password);
      dispatch({
        type:userTypes.SIGN_IN_SUCCESS,
        payload:true
      });
    } 
    catch(e){
      dispatch({
        type:userTypes.SIGN_IN_ERROR,
        payload:[e.message]
      })
    }
    
  }

  export const signUpUser=({displayName,email,password,confirmPassword})=>
    async(dispatch)=>{
      const err=[];
      
      try{
        if(displayName.trim()==""){
          err.push("Display name should have a value");
        }
        if(password!==confirmPassword){
          err.push('Passwords dont match');
          // dispatch({
          //   type:userTypes.SIGN_UP_ERROR,
          //   payload:err
          // });
          // return;
        }
        if(err.length>0){
          console.log("Errorsinjere",err);
          throw new Error();
        }else{
          console.log("NOerrorsinHere",err);
      
          const {user}=await auth.createUserWithEmailAndPassword(email,password);
          await handleUserProfile(user,{displayName});
          dispatch({
            type:userTypes.SIGN_UP_SUCCESS,
            payload:true
          });
        }
      }catch(e){
        
        dispatch({
          type:userTypes.SIGN_UP_ERROR,
          payload:[...err,e.message]
        });
      }
    };

export const resetPassword=(email)=>
  async dispatch=>{
    try{
      
      const config={
        url:'http://localhost:3000/login'
      };
      
      await auth.sendPasswordResetEmail(email,config);
      dispatch({
        type:userTypes.RESET_PASSWORD_SUCCESS,
        payload:true
      })
    }catch(e){
      dispatch({
        type:userTypes.RESET_PASSWORD_ERROR,
        payload:[e.message]
      });
      
    }  
}
export const signInWithGoogle=()=>async dispatch=>{
  try{
    await auth.signInWithPopup(GoogleProvider);
    dispatch({type:userTypes.SIGN_IN_SUCCESS,
    payload:true});
  }catch(e){

  }

}

export const resetAllAuthForms=()=>
({type:userTypes.RESET_AUTH_FORMS});

  
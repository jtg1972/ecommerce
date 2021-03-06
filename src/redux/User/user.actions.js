import userTypes from './user.types';

export const emailSignInStart=userCredentials=>({
  type:userTypes.EMAIL_SIGN_IN_START,
  payload:userCredentials
});

export const signInSuccess=user=>({
  type:userTypes.SIGN_IN_SUCCESS,
  payload:user
});

export const checkUserSession=()=>({
  type:userTypes.CHECK_USER_SESSION
});

export const signOutUserStart=()=>({
  type:userTypes.SIGN_OUT_USER_START
});

export const signOutUserSuccess=()=>({
  type:userTypes.SIGN_OUT_USER_SUCCESS

});

export const signUpUserStart=(userCredentials)=>({
  type:userTypes.SIGN_UP_USER_START,
  payload:userCredentials
});

export const signInError=err=>({
  type:userTypes.SIGN_IN_ERROR,
  payload:err
});

export const signUpError=err=>({
  type:userTypes.SIGN_UP_ERROR,
  payload:err
});

export const resetError=err=>({
  type:userTypes.RESET_ERROR,
  payload:err
});

export const googleError=err=>({
  type:userTypes.GOOGLE_ERROR,
  payload:err
});
export const resetPasswordStart=email=>({
  type:userTypes.RESET_PASSWORD_START,
  payload:email
});

export const resetPasswordSuccess=()=>({
  type:userTypes.RESET_PASSWORD_SUCCESS,
  payload:true
});

export const resetUserState=()=>({
  type:userTypes.RESET_USER_STATE
});

export const googleSignInStart=()=>({
  type:userTypes.GOOGLE_SIGN_IN_START,

});














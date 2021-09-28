import {takeLatest, all, call, put}from 'redux-saga/effects';
import userTypes from './user.types';
import {signInSuccess,signOutUserSuccess,
  signInError,signUpError,resetError,googleError,resetPasswordSuccess} from './user.actions';
import {auth} from './../../firebase/utils';
import {handleUserProfile,GoogleProvider,getCurrentUser} from './../../firebase/utils';
import {handleResetPasswordAPI} from './user.helpers';
export function* getSnapshotFromUserAuth(user,displayName){
  try{
    console.log("userewe22",user,displayName);
    let userRef={};
    if(displayName){
      userRef=yield call(handleUserProfile,{
        userAuth:user,
        additionalData:{displayName}
      });
    }else{
      userRef=yield call(handleUserProfile,{
        userAuth:user,
      });

    }
    const snapshot=yield userRef.get();
    console.log("snapshot",snapshot);
    yield put(signInSuccess({
      id: snapshot.id,
      ...snapshot.data()
    }));
    
    
  }catch(e){
    console.log("errorror",e);
  }
}

export function *emailSignIn({payload:{email,password}}){
  try{
    const {user}=yield auth.signInWithEmailAndPassword(email,password);
    console.log("User",user);
    
    yield getSnapshotFromUserAuth(user);
    
  } 
  catch(e){
    console.log("Erroree",e);
    yield put(signInError([e.message]));
    // dispatch({
    //   type:userTypes.SIGN_IN_ERROR,
    //   payload:[e.message]
    // })
  }
}

export function* onEmailSignInStart(){
  yield takeLatest(userTypes.EMAIL_SIGN_IN_START,emailSignIn)
}

export function* isUserAuthenticated(){
  try{
    const userAuth=yield getCurrentUser();
    console.log("UA",userAuth);
    if(!userAuth){
      return;
    }else{
      yield getSnapshotFromUserAuth(userAuth);
      //yield put(userError([]));
    }
  }catch(err){
    console.log(err);
  }
}

export function* onCheckUserSession(){
  yield takeLatest(userTypes.CHECK_USER_SESSION,isUserAuthenticated);
}

export function* signOutUser(){
  try{
    yield auth.signOut();
    yield put(signOutUserSuccess());
  }catch(e){

  }
}
export function* onSignOutUserStart(){
  yield takeLatest(userTypes.SIGN_OUT_USER_START,signOutUser);
}

export function* signUpUser({payload:{
  displayName,
  email,
  password,
  confirmPassword
}}){
  console.log("payload",displayName,email,
  password,confirmPassword);
  let errors=[];
  if(password!==confirmPassword){
    
    errors.push("Passwords dont match");
  }
  if(displayName.trim()===""){
    errors.push("Display name cant be empty");
  }
  try{
    console.log("erlen",errors.length);
    
      const {user}=yield auth.createUserWithEmailAndPassword(
        email,
        password
      );
      yield getSnapshotFromUserAuth(user,displayName);
      //yield put(userError([]));

  }catch(e){
    errors.push(e.message);
    yield put(signUpError(errors)); 
  }
}

export function* onSignUpUserStart(){
  yield takeLatest(userTypes.SIGN_UP_USER_START,signUpUser);
}

export function* resetPassword({payload}){
  const config={url:"http://localhost:3000/login"};
  try{
    yield handleResetPasswordAPI(payload);
    yield put(resetPasswordSuccess());
    yield put(resetError([]));
  }catch(e){
    yield put(resetError(e));
  }
}
export function* onResetPasswordStart(){
  yield takeLatest(userTypes.RESET_PASSWORD_START,resetPassword);
}

export function* googleSignIn(){
  try{
    const {user}=yield auth.signInWithPopup(GoogleProvider);
    console.log("gsi",user);
    yield getSnapshotFromUserAuth(user);
  }catch(e){
    yield put(googleError([e.message]));
  }
}

export function* onGoogleSignInStart(){
  yield takeLatest(userTypes.GOOGLE_SIGN_IN_START,googleSignIn);
}





export default function* userSagas(){
  yield all([
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutUserStart),
    call(onSignUpUserStart),
    call(onResetPasswordStart),
    call(onGoogleSignInStart),
  ]);
}
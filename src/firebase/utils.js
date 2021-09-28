import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import {firebaseConfig} from './config';

firebase.initializeApp(firebaseConfig);

export const auth=firebase.auth();
export const firestore=firebase.firestore();
export const GoogleProvider=new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({prompt:'select_account'});

// export const signInWithGoogle=()=>auth.signInWithPopup(GoogleProvider);
export const handleUserProfile=async({userAuth,additionalData})=>{
  if(!userAuth){
    return;
  }
  
  const {uid}=userAuth;
  console.log("uid22b",uid);
  
  const userRef=firestore.doc(`users/${uid}`);
  const snapshot=await userRef.get();
  console.log("snapshot",snapshot);
  if(!snapshot.exists){
    try{
      console.log("snapshot",snapshot);
      let {email,displayName}=userAuth;
      if(!displayName)
        displayName=additionalData.displayName;
      console.log("edn",email,displayName);
      const timestamp=new Date();
      const userRoles=['user'];
      console.log("userroles",userRoles);
      await userRef.set({
        email,
        createdDate:timestamp,
        userRoles:userRoles,
        displayName:displayName,
      });
    }catch(e){
      console.log(e);
    }
  }
  return userRef;

};

export const getCurrentUser=()=>{
  console.log("entro getCUrrentUser");
  return new Promise((resolve,reject)=>{
    const unsubscribe=auth.onAuthStateChanged(
      userAuth=>{
        if(userAuth){
          console.log("ua",userAuth);
          unsubscribe();
          return resolve(userAuth);
        }else{
          return reject();
        }
      },
    
    );
  });
}
import {auth} from './../../firebase/utils';

export const handleResetPasswordAPI=async(email)=>{
  const config={url:"http://localhost:3000/login"};
  return new Promise((resolve,reject)=>{
    
    
      auth.sendPasswordResetEmail(email,config).
      then(()=>{
        resolve();
      })
      .catch(e=>{
        reject([e.message]);
      });
    });
  }

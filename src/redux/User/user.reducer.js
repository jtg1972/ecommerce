import userTypes from './user.types';
const INITIAL_STATE={
  currentUser:null,
  signInError:[],
  signUpError:[],
  resetError:[],
  googleError:[],
  resetPasswordSuccess:false
};

const userReducer=(state=INITIAL_STATE,action)=>{
  switch(action.type){
    case userTypes.SIGN_IN_SUCCESS:
      return {...state,
        currentUser:action.payload,
        userErr:[]};
    case userTypes.RESET_PASSWORD_SUCCESS:
      return {...state,resetPasswordSuccess:action.payload};
    case userTypes.SIGN_IN_ERROR:
      return {...state,signInError:action.payload};
    case userTypes.SIGN_UP_ERROR:
      return {...state,signUpError:action.payload};
    case userTypes.RESET_ERROR:
        return {...state,resetError:action.payload};
      case userTypes.GOOGLE_ERROR:
          return {...state,googleError:action.payload};
    case userTypes.RESET_USER_STATE:     
    case userTypes.SIGN_OUT_USER_SUCCESS:
      return {...state,...INITIAL_STATE};
      

    default:
       return state;
  
  }
};

export default userReducer;
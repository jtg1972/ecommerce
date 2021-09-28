import productsTypes from "./products.types";
const INITIAL_STATE={
  errors:"",
  productSuccess:false,
  products:{},
  product:{}
}

export const productResolver=(state=INITIAL_STATE,action)=>{
  switch(action.type){
    case productsTypes.SET_PRODUCTS:
      return {...state, products:action.payload};
    case productsTypes.ADD_ERROR:
      return {...state,errors:action.payload};
    case productsTypes.ADD_NEW_PRODUCT_SUCCESS:
      return {...state,productSuccess:action.payload,errors:""};
    case productsTypes.RESET_FORM:
      return INITIAL_STATE; 
    case productsTypes.SET_PRODUCT:
      return {...state,product:action.payload}
    default:
      return state;
  }
};
import {all,call,takeLatest,put} from 'redux-saga/effects'
import { auth } from '../../firebase/utils';
import { addProductSuccess, fetchProductsStart, resetForm, setErrors, setProduct, setProducts } from './products.actions';
import { handleAddProduct, handleDeleteProduct, handleFetchProduct, handleFetchProducts, validateProduct } from './products.helpers';
import productsTypes from './products.types'

export function* addProduct({payload}){
  let errors="";
  try{
    yield put(resetForm());
    const timestamp=new Date();
    errors=validateProduct(payload);
    console.log("ERRORS",errors);
    if(errors==""){
      yield handleAddProduct({
        ...payload,
        productAdminUserUID:auth.currentUser.uid,
        createdDate:timestamp
      });
      yield put(addProductSuccess());
      yield put(fetchProductsStart({filterType:"",startAfterDoc:{},persistProducts:[]}));
      
    }else{
      console.log("entro error");
      yield put(setErrors(errors));
    }
  }catch(e){
    
    yield put(setErrors(e.message));
  }
}

export function* onAddProductStart(){
  yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START,addProduct);

}

export function* fetchProducts({payload}){
  try{
    console.log("Payload",payload);
    const products=yield handleFetchProducts(payload);
    console.log("PRODUCTOS {}}",products);
    yield put(setProducts(products));
  }catch(err){
    console.log("err",err);
  }
}

export function* onFetchProductsStart(){
  yield takeLatest(productsTypes.FETCH_PRODUCTS_START,fetchProducts);
}

export function* deleteProduct({payload}){
  try{
    console.log("entro delete product saga");
    yield handleDeleteProduct(payload);
    yield put(fetchProductsStart({filterType:"",startAfterDoc:{},persistProducts:[]}));
  }catch(e){
    console.log(e);
  }
}

export function* onDeleteProductStart(){
  yield takeLatest(productsTypes.DELETE_PRODUCT_START,deleteProduct);
}

export function* fetchProduct({payload}){
  try{
    const product=yield handleFetchProduct(payload);
    yield put(setProduct(product));
  }catch(e){
    
  }
}

export function* onFetchProductSingleStart(){
  yield takeLatest(productsTypes.FETCH_PRODUCT_START,fetchProduct);
}


export default function* productsSagas(){
  yield all([
    call(onAddProductStart),
    call(onFetchProductsStart),
    call(onDeleteProductStart),
    call(onFetchProductSingleStart),
  ])
}
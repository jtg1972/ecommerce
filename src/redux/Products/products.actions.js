import productsTypes from "./products.types";



export const addProductStart=(productData)=>({
  type:productsTypes.ADD_NEW_PRODUCT_START,
  payload:productData
});

export const addProductSuccess=()=>({
  type:productsTypes.ADD_NEW_PRODUCT_SUCCESS,
  payload:true
});

export const setErrors=(e)=>({
  type:productsTypes.ADD_ERROR,
  payload:e
});
export const resetForm=()=>({
  type:productsTypes.RESET_FORM
});

export const fetchProductsStart=(payload)=>({
  type:productsTypes.FETCH_PRODUCTS_START,
  payload:payload
});

export const setProducts=(products)=>({
  type:productsTypes.SET_PRODUCTS,
  payload:products
});

export const deleteProductStart=(productId)=>({
  type:productsTypes.DELETE_PRODUCT_START,
  payload:productId
})

export const fetchProductStart=(productID)=>({
  type:productsTypes.FETCH_PRODUCT_START,
  payload:productID
})

export const setProduct=(product)=>({
  type:productsTypes.SET_PRODUCT,
  payload:product
})
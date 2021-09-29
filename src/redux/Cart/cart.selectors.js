import {createSelector} from 'reselect'

//const selectCartData=state=>state.cart

//export const selectCartItems=state=>state.cart.cartItems


export const selectCartItemsCount=createSelector(
  state=>state.cartItems,
  cartItems=>cartItems.reduce((quantity,cartItem)=>
  quantity+cartItem.qty,0)
)

export const selectCartTotal=createSelector(
  state=>state.cartItems,
  cartItems=>cartItems.reduce((total,item)=>
    total+(item.qty*item.productPrice),0)
)
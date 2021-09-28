import {createSelector} from 'reselect'

const selectCartData=state=>state.cart

const selectCartItems=createSelector(
  [selectCartData],
  cartData=>cartData.cartItems
)

export const selectCartItemsCount=createSelector(
  [selectCartItems],
  cartItems=>cartItems.reduce((quantity,cartItem)=>
  quantity+cartItem.qty,0)
)
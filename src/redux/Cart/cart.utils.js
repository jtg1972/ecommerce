export const existingCartItem=({
  prevCartItems,
  nextCartItem
})=>{
  return prevCartItems.find((cartItem)=>
    cartItem.documentID==nextCartItem.documentID
  )
}

export const handleAddToCart=({
  prevCartItems,
  nextCartItem

})=>{
  const quantityIncrement=1;
  const cartItemExists=existingCartItem({prevCartItems,nextCartItem});
  if(cartItemExists){
    return prevCartItems.map(item=>{
      if(item.documentID==nextCartItem.documentID){
        return {
          ...item,
          qty:item.qty+quantityIncrement
        }
      }else
        return item
    })
  }else{
    return [...prevCartItems,{...nextCartItem,qty:quantityIncrement}];
    
  }
    

}

export const handleRemoveCartItem=({
  prevCartItems,
  cartItemToRemove
})=>{
  return prevCartItems.filter(item=>
    item.documentID!==cartItemToRemove.documentID)
}

export const handleReduceCartItem=({
  prevCartItems,
  cartItemToReduce
})=>{
  const existingCartItem=prevCartItems.find(item=>
    item.documentID==cartItemToReduce.documentID)
  if(existingCartItem.qty==1){
    return prevCartItems.filter(item=>item.documentID!==cartItemToReduce.documentID)
  }else{
    return prevCartItems.map(item=>
      item.documentID===cartItemToReduce.documentID?
        {...item,qty:item.qty-1}:item
    )
  }

}
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
    prevCartItems.push({...nextCartItem,qty:quantityIncrement});
    return prevCartItems
  }
    

}
import React from 'react'
import Men from '../../../assets/lasvegas-jorgetono.jpg'
import Women from '../../../assets/lasvegas-jorgecony.jpg'
import { useDispatch } from 'react-redux'
import { addProduct, reduceCartItem, removeCartItem } from '../../../redux/Cart/cart.actions'
const Item = ({item}) => {
  const dispatch=useDispatch();
  const {productName,
  productThumbnail,
  productPrice,
  qty,
  documentID
}=item

const handleAddProduct=(product)=>{
  dispatch(addProduct(product))
}

  return (
    <table className="cartItem">
      <tbody>
        <tr>
          <td className="img">
            <img src={productThumbnail=="mens"?Men:Women}/>
          </td>
          <td>{productName}</td>
          <td>
            <span className="cartBtn"
            onClick={()=>dispatch(reduceCartItem(item))}>{'< '}</span>
            <span>{qty}</span>
            <span className="cartBtn"
            onClick={()=>handleAddProduct(item)}>{' >'}</span>
          </td>
          <td>{productPrice}</td>
          <td align="center"><span
          onClick={()=>dispatch(removeCartItem(item))}>X</span></td>
        </tr>
      </tbody>
    </table>
  )
}

export default Item

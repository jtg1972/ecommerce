import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { createStructuredSelector } from 'reselect'
import { selectCartItems, selectCartItemsCount, selectCartTotal } from '../../redux/Cart/cart.selectors'
import Button from '../forms/Button'
import Item from './Item'
import './styles.scss'

const mapState=({cart})=>({
  cartItems:cart.cartItems,
  cartItemsCount:selectCartItemsCount(cart),
  total:selectCartTotal(cart)
})
const Checkout = () => {
  const history=useHistory();
  const {cartItems,cartItemsCount,total}=useSelector(mapState)

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <div>
        {cartItemsCount==0?<p>There are no elements in your cart</p>:
        <table style={{width:"100%"}}>
          <tbody>
            <tr>
              <table className="checkoutHeader">
                <tbody>
                  <tr>
                    <th>Product</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Remove</th>
                  </tr>
                </tbody>
              </table>
            </tr>
            <tr>
              <table className="cart">
                <tbody>
                  {cartItems.map((item,pos)=>{
                    return (
                      <tr key={pos}>
                        <td><Item item={item}/></td>
                        
                      </tr>
                    )
                  })}
                  
                </tbody>
              </table>
            </tr>
            <tr>
              <table align="right">
                <tr align="right">
                  <td>
                    <h3>
                      Total:{total}
                    </h3>
                  </td>
                </tr>
              </table>
            </tr>
            <tr>
              <table style={{width:"100%"}}>
                <tbody style={{width:"100%"}}>
                  <tr>
                    <td style={{width:"50%"}}>
                      <Button onClick={()=>history.push('/search')}>Continue shopping</Button>
                    </td>
                    <td style={{width:"50%"}}>
                      <Button>Check out</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </tr>
            
          </tbody>
        </table>
        }
      </div>
    </div>
  )
}

export default Checkout

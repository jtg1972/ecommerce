import React from 'react'
import Men from '../../../assets/lasvegas-jorgetono.jpg';
import Women from '../../../assets/lasvegas-jorgecony.jpg';
import './styles.scss';
import Button from '../../forms/Button';
import { Link,useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {addProduct} from '../../../redux/Cart/cart.actions';
const Product = (product) => {
  const dispatch=useDispatch();
  const history=useHistory();
  const {productThumbnail,
    productName,
    productPrice,
    documentID}=product
  if(!productThumbnail || !productName || productPrice==0){
    return null;
  }

  const handleAddToCart=(product)=>{
    if(!product)
      return
    dispatch(addProduct(product))
    history.push('/cart');
  }

  const configAddToCardButton={
    type:"button",
    style:{fontSize:"0.5rem"}

  };
  return (
    <div className="product">
      <div className="thumb">
        <Link to={`/product/${documentID}`}>
          <img src={productThumbnail=="mens"?Men:Women}/>
        </Link>
      </div>
      <div className="details">
        <ul>
          <li>
          <Link to={`/product/${documentID}`}>
            <span className="name">{productName}</span>
          </Link>
          </li>
          <li>
            <span className="price">${productPrice}</span>
          </li>
          <li>
            <Button {...configAddToCardButton}
              onClick={()=>handleAddToCart(product)}
            >
              Add to Cart</Button>
          </li>
        </ul>
      </div>
      
    </div>
  )
}

export default Product

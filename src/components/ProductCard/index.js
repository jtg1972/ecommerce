import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams,useHistory } from 'react-router'
import { fetchProductStart, setProduct } from '../../redux/Products/products.actions';
import './styles.scss'
import Men from '../../assets/lasvegas-jorgetono.jpg';
import Women from '../../assets/lasvegas-jorgecony.jpg'
import Button from '../forms/Button';
import { addProduct } from '../../redux/Cart/cart.actions';
const mapState=({product})=>({
  product:product.product
})

const ProductCard = () => {
  const {productId}=useParams();
  const dispatch=useDispatch();
  const history=useHistory();

  const {product}=useSelector(mapState);

  const {productName,productThumbnail,productPrice,
        productCategory,productDesc}=product;
  useEffect(()=>{
    dispatch(fetchProductStart(productId));
    return ()=>{
      dispatch(setProduct({}));
    }
  },[])

  const configAddToCartButton={
    type:"button",

  }

  return (
    <div className="productCart">
      <div className="hero">
        <img src={productThumbnail=="mens"?Men:Women}/>
      </div>
      <div className="productDetails">
        <ul>
          <li>
            <h1>{productName}</h1>
          </li>
          <li>
            <span>
              ${productPrice}
            </span>
          </li>
          <li>
            <div className="addToCard">
              <Button {...configAddToCartButton}
                onClick={()=>{
                  if(!product){
                    return;
                  }
                  console.log("PRODID",productId);
                  dispatch(addProduct(product));
                  history.push('/cart');
                }}>
                Add to Cart
              </Button>
            </div>
          </li>
          <li>
            <span dangerouslySetInnerHTML={{__html:productDesc}}/>
          </li>
        </ul>
      </div>
      
    </div>
  )
}

export default ProductCard

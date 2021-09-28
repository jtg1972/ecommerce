import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsStart } from '../../redux/Products/products.actions';
import Product from './Product';
import FormSelect from '../forms/FormSelect';
import './styles.scss'
import { useHistory, useParams } from 'react-router';
import LoadMore from '../LoadMore';
const mapState=({product})=>({
  products:product.products
})

function ProductResults() {
  const history=useHistory();
  const dispatch=useDispatch();
  const {filterType=""}=useParams();
  const {products}=useSelector(mapState);
  
  const {data,queryDoc,isLastPage}=products

  console.log("ilp",isLastPage);
  const handleFilter=(e)=>{
    const nextFilter=e.target.value;
    console.log("nf",nextFilter);
    if(nextFilter==""){
      history.push("/search");
    }else{
      history.push(`/search/${nextFilter}`)
    }
  }
  useEffect(()=>{
    dispatch(fetchProductsStart({filterType,persistProducts:[],startAfterDoc:{}}));
  },[filterType]);

  if(!Array.isArray(data)) return null;
  if(data.length==0)
    return (
      <div className="products">
        <p>No search results</p>
      </div>
    );
  const configFilters={
    defaultValue:filterType,
    options:[{
      name:"Show All",
      value:""
    },
    {
      name:"Mens",
      value:"mens"
    },
    {
      name:"Womens",
      value:"womens"
    }],
    handleChange:handleFilter,
    style:{padding:"8px 12px 8px 0px",margin:0,width:"110px",border:"none",outline:"none"}
  };

  const handleLoadMore=()=>{
    dispatch(fetchProductsStart({filterType,startAfterDoc:queryDoc,
      persistProducts:data}))
  }

  const configLoadMore={
    onLoadMoreEvt:handleLoadMore

  }
  

  return (
    <div>
      <h1>Browse Products</h1>
      <FormSelect
          {...configFilters}
        />

     
    <div className="products">
      

    
      
      {data.map((product,index)=>{
        const {
          productThumbnail,
          productName, 
          productPrice,
          documentID,
          productDesc}
        =product;
        
        const configProduct={
          productThumbnail,
          productName, 
          productPrice,
          documentID,
          productDesc,
        }
        return(
          <Product {...configProduct}/>

        );
      })}
      
    
    </div>
    {!isLastPage && 
     <LoadMore {...configLoadMore}/>
    }
  </div>
  )
}

export default ProductResults

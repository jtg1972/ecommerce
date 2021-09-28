import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../components/forms/Button'
import FormInput from '../../components/forms/FormInput'
import FormSelect from '../../components/forms/FormSelect'
import { addProductStart, deleteProductStart, fetchProductsStart} from '../../redux/Products/products.actions'
import './styles.scss';
import Modal from '../../components/Modal'
import Man from './../../assets/lasvegas-jorgetono.jpg';
import Woman from './../../assets/lasvegas-jorgecony.jpg';
import LoadMore from '../../components/LoadMore'
import {CKEditor} from 'ckeditor4-react'
const mapState=({product})=>{
  console.log("pr",product);
  return ({
    error:product.errors,
    productSuccess:product.productSuccess,
    products:product.products,
  });
}


function Admin() {
  const {error,productSuccess,products}=useSelector(mapState);
  const [hideModal,setHideModal]=useState(true);
  const [productCategory,setProductCategory]=useState("mens");
  const [productName,setProductName]=useState("");
  const [productThumbnail,setProductThumbnail]=useState("mens");
  const [productPrice,setProductPrice]=useState(0);
  const [errors,setErrors]=useState("");
  const [productDesc, setProductDesc]=useState("");

  const dispatch=useDispatch();
  const {data,queryDoc,isLastPage}=products;

  const toggleModal=()=>setHideModal(!hideModal);

  const resetForm=()=>{
    setProductCategory("mens");
    setProductName("");
    setProductPrice(0);
    setProductThumbnail("mens");
    setProductDesc("");
    setErrors("");
  };

  useEffect(()=>{
    dispatch(fetchProductsStart({filterType:"",
    startAfterDoc:{},persistProducts:[]}));
  },[]);

  useEffect(()=>{
    if(error!==""){
      setErrors(error);
    }
  },[error]);

  useEffect(()=>{
    console.log("producsuccess",productSuccess);
    if(productSuccess==true){
      
      toggleModal();
      resetForm();
    }
  },[productSuccess]);

  
  
  const configModal={
    hideModal,
    toggleModal,
    
  };

  
  
  const handleSubmit=e=>{
    e.preventDefault();
    
    dispatch(addProductStart({
      productCategory,
      productName,
      productThumbnail,
      productPrice,
      productDesc,
    }));

    
    
  };
  const handleLoadMore=()=>{
    dispatch(fetchProductsStart({filterType:"",startAfterDoc:queryDoc,
      persistProducts:data}))
  }

  const configLoadMore={
    onLoadMoreEvt:handleLoadMore

  }
  

  return (
    <div className="admin">
      <div className="callToActionAdmin">
        <ul>
          <li>
            <Button onClick={()=>toggleModal()}>
              Add new product
            </Button>
          </li>
        </ul>
      </div>
      <Modal {...configModal}>
        <div className="addNewProductForm">
          
          <form onSubmit={handleSubmit}>
            <h2>Add new Product</h2>
            {errors!==""?<p style={{color:"red",marginBottom:"0.5rem"}}>{errors}</p>:""}
            <FormSelect
              label="Category"
              options={[{
                value:"mens",
                name:"Mens"
              },{
                value:"womens",
                name:"Womens"
              }]}
              handleChange={e=>setProductCategory(e.target.value)}
            />
            <FormInput
              label="Name"
              type="text"
              value={productName}
              handleChange={e=>setProductName(e.target.value)}  
            />
            <FormSelect
              label="Main image URL"
              options={[{
                value:"mens",
                name:"Mens"
              },{
                value:"womens",
                name:"Womens"
              }]}
              handleChange={e=>setProductThumbnail(e.target.value)}
              value={productThumbnail}
            />
            <FormInput
              label="Price"
              type="number"
              min="0.00"
              max="10000.00"
              step="0.01"
              value={productPrice}
              handleChange={e=>setProductPrice(e.target.value)}
            />
            <CKEditor
              onChange={e=>setProductDesc(e.editor.getData())}
              style={{height:"120px",overflowY:"scroll"}}
            />
            <br/>

            <div className="buttons">
              <Button type="submit" style={{width:"40%"}}>
                Add product
              </Button>
              <Button type="button" onClick={()=>{
                  toggleModal();
                  resetForm();
                }}
                style={{width:"40%",marginLeft:"1%"}}>
                Cancel
              </Button>
            </div>
          </form>

        </div>
      </Modal>
      <div className="manageProducts">
          <table border="0">
            <tbody>
              <tr>
                <th>
                  <h1 style={{marginBottom:"10px"}}>
                    Manage Products
                  </h1>
                </th>
              </tr>
              <tr>
                <td>
                  <table className="results">
                    <tbody>
                      <tr>
                        {data && data.map((product,index)=>{
                          const {
                            productName,
                            productPrice,
                            productThumbnail,
                            productCategory,
                            documentID
                          }=product;
                          return (
                            <tr key={index}>
                              <td>
                                <img
                                  src={productCategory=="mens"?
                                  Man:Woman}  
                                />
                              </td>
                              <td>
                                {productName}
                              </td>
                              <td>
                                ${productPrice}
                              </td>
                              <td>
                                <Button
                                  onClick={()=>{
                                    dispatch(deleteProductStart(documentID));
                                  }}>
                                  Delete
                                </Button>
                              </td>
                            </tr>

                          )
                        })}
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>

                </td>
              </tr>
              {!isLastPage && <tr>
                <td>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <LoadMore {...configLoadMore}/>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>}
            </tbody>
          </table>
      </div>
    </div>
  )
}

export default Admin

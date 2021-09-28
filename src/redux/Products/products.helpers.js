import { firestore } from "../../firebase/utils"
import { fetchProductsStart } from "./products.actions";


export const handleAddProduct=product=>{
  console.log("producto",product);
  return new Promise((resolve,reject)=>{
    firestore.collection("products")
      .doc()
      .set(product)
      .then(()=>{
        resolve();
      })
      .catch(e=>{
        reject(e);
      })
    })
}

export function validateProduct(product){
  let errors="";
  if(product.productCategory==""){
    errors="Category cant be empty";
    return errors;
  }
  if(product.productName=="" ){
    errors="Product name cant be empty";
    return errors;
  }
  if(product.productThumbnail==""){
    errors="Product thumbnail cant be empty";
    return errors;
  }
  if(parseFloat(product.productPrice)<1.0){
    errors="Product price should be greater than zero";
    return errors;
  }
  if(product.productDesc==""){
    errors="Product description cant be empty";
    return errors;
  }
  return errors;


}

export const handleFetchProducts=(payload)=>{

  return new Promise((resolve,reject)=>{
    const pageSize=3;
    console.log("filtertype",payload.filterType);
    let ref=firestore.collection("products")
    .orderBy("createdDate").limit(pageSize);
    if(payload.filterType!==""){
      ref=ref.where("productCategory","==",payload.filterType);
    }
    console.log("PLSAd",payload.startAfterDoc);
    if(Object.keys(payload.startAfterDoc).length>0){
      console.log("ENTROAQUI");
      ref=ref.startAfter(payload.startAfterDoc);
    }
    ref
      .get()
      .then((snapshot)=>{
        const totalCount=snapshot.size
        console.log("tc",totalCount);
        console.log("comp",totalCount===0);
        const productsArray=snapshot.docs
          .map(doc=>{
            return {
              ...doc.data(),
              documentID:doc.id

            };
          });
        console.log("proarr",productsArray);
        
        resolve({data:[...payload.persistProducts,
            ...productsArray],
            queryDoc:snapshot.docs[totalCount-1],
            isLastPage:totalCount===0});
          
        
      }).
        catch(e=>
          reject(e)
      )
  });
  
}

export const handleDeleteProduct=(documentID)=>{
  console.log("DID",documentID);
  return new Promise((resolve,reject)=>{
    firestore.collection("products")
    .doc(documentID)
    .delete()
    .then(()=>{
      resolve();
    })
    .catch(e=>{
      reject(e);
    })
  })
}

export const handleFetchProduct=(productID)=>{
  return new Promise((resolve,reject)=>{
    firestore.collection("products")
      .doc(productID)
      .get()
      .then(product=>{
        if(product.exists)
          resolve({
            documentID:product.id,
            ...product.data()})
      })
      .catch(err=>reject(err))
  })
}

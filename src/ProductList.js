import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import './ProductList.css'
import Home from './Home';


const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    
    fetch('http://localhost:8082/api/item/items')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
   
  }, []);

  const item=[];
  const price=[];
  const product_with_id=[]
  const addToCart = (product) => {
    // Add logic to add the product to the cart
    console.log(`Product ${product} added to cart`);
    
   alert("Product with name " +product.name +" is added to the cart ")
  //  alert(product.name);
    createItemList(product);

  };

  const createItemList = (product)=>{
    item.push(product.name)
    price.push(product.price)
    product_with_id.push(product.id)
  }
 
   
  var custid;
  const showAll = ()=>{
   const priceSum = price.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
   const current = new Date();
   const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

   var jsondata= {
      OrderDto : [
        {
         "orderdate" : date,
          "orderdesc" : "items with item list "+item,
         "custid" : localStorage.getItem("customerId"),
          "totalprice" : priceSum,
          "itemList" : item
        }
      ]
    }
   const response = fetch('http://localhost:8083/api/order/create', {
      method: 'POST',
      body: JSON.stringify(jsondata.OrderDto[0]),
      headers: {
       'Content-Type': 'application/json'
      }
    });
    
   alert("Order placed successfully with items "+item)
  for(var i=0;i<item.length;i++){
    fetch('http://localhost:8082/api/item/deleteItemById/'+product_with_id.pop(i),{
      method: 'DELETE'
    })
    .then(response => response.json())
    .catch(error => console.error('Error fetching products:', error));
  }
  
  
  }

  return (
    <>
    <div>
      <h2>Products</h2>
      <div className="product-list">
        {products.map(product => (
          <ProductCard key={product} product={product} addToCart={addToCart} />
        ))}
      </div>
      <button type="submit" className="submit-btn" onClick={showAll} >Place Order</button>
    </div>
    </>
    
  );
 
};

export default ProductList;
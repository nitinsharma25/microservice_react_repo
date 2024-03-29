import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import './ProductList.css'

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    //fetch('https://fakestoreapi.com/products')
    
    fetch('http://localhost:8082/api/item/items')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
   
  }, []);

  const addToCart = (productId) => {
    // Add logic to add the product to the cart
    console.log(`Product ${productId} added to cart`);
  };

  return (
    <>
    <div>
      <h2>Products</h2>
      <div className="product-list">
        {products.map(product => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
    </>
  );
};

export default ProductList;
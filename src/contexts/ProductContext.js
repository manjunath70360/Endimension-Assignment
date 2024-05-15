import React, { createContext, useState } from 'react';

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([
    { id: 1, category: 'Electronics', name: 'Laptop', description: 'A powerful laptop for all your computing needs.', price: 999 },
    { id: 2, category: 'Clothing', name: 'T-shirt', description: 'Comfortable cotton t-shirt for everyday wear.', price: 15 },
    { id: 3, category: 'Electronics', name: 'Smartphone', description: 'The latest smartphone with advanced features.', price: 699 },
    { id: 4, category: 'Books', name: 'The Great Gatsby', description: 'A classic novel by F. Scott Fitzgerald.', price: 10 },
    { id: 5, category: 'Electronics', name: 'Headphones', description: 'Noise-cancelling over-ear headphones.', price: 199 },
    { id: 6, category: 'Clothing', name: 'Jeans', description: 'Stylish and comfortable denim jeans.', price: 40 },
    { id: 7, category: 'Books', name: '1984', description: 'A dystopian novel by George Orwell.', price: 15 },
    { id: 8, category: 'Electronics', name: 'Tablet', description: 'A high-resolution tablet for media and productivity.', price: 399 },
    { id: 9, category: 'Clothing', name: 'Sneakers', description: 'Comfortable and trendy sneakers.', price: 60 },
    { id: 10, category: 'Books', name: 'To Kill a Mockingbird', description: 'A novel by Harper Lee.', price: 12 },
    { id: 11, category: 'Electronics', name: 'Camera', description: 'A DSLR camera for professional photography.', price: 1200 },
    { id: 12, category: 'Clothing', name: 'Jacket', description: 'A warm and stylish jacket for cold weather.', price: 100 },
    { id: 13, category: 'Books', name: 'The Catcher in the Rye', description: 'A novel by J.D. Salinger.', price: 10 },
    { id: 14, category: 'Electronics', name: 'Smartwatch', description: 'A smartwatch with fitness tracking features.', price: 250 },
    { id: 15, category: 'Clothing', name: 'Socks', description: 'Comfortable and durable socks.', price: 5 },
    { id: 16, category: 'Books', name: 'Moby Dick', description: 'A novel by Herman Melville.', price: 15 },
    { id: 17, category: 'Electronics', name: 'Monitor', description: 'A 4K Ultra HD monitor for gaming and work.', price: 350 },
    { id: 18, category: 'Clothing', name: 'Hat', description: 'A stylish hat for sunny days.', price: 20 },
    { id: 19, category: 'Books', name: 'Pride and Prejudice', description: 'A classic novel by Jane Austen.', price: 10 },
    { id: 20, category: 'Electronics', name: 'Gaming Console', description: 'The latest gaming console with 4K support.', price: 499 },
  ]);

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  const editProduct = (productId, updatedProduct) => {
    setProducts(products.map((product) => (product.id === productId ? updatedProduct : product)));
  };

  const deleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, editProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };

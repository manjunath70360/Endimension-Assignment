import React, { useContext, useEffect, useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { withRouter } from 'react-router-dom';
import { ProductContext } from '../../contexts/ProductContext';

import "./index.css"

const { Option } = Select;

const ProductForm = ({ history, match }) => {
  const { products, addProduct, editProduct } = useContext(ProductContext);
  const [product, setProduct] = useState({ category: '', name: '', description: '', price: '' });
  const productId = match.params.id;

  useEffect(() => {
    if (productId) {
      const existingProduct = products.find((p) => p.id === Number(productId));
      if (existingProduct) {
        setProduct(existingProduct);
      }
    }
  }, [productId, products]);

  const onFinish = (values) => {
    if (productId) {
      editProduct(Number(productId), { ...values, id: Number(productId) });
    } else {
      addProduct({ ...values, id: Date.now() });
    }
    history.push('/');
  };

  return (
    <div className='product-form-con'>
      <h1 className='head'>{productId ? 'Edit Product' : 'Add Product'}</h1>
      <Form layout="vertical" onFinish={onFinish} initialValues={product}>
        <Form.Item
          name="category"
          label="Category"
          className='label'
          rules={[{ required: true, message: 'Please select a category!' }]}
        >
          <Select className='select-field' placeholder="Select a category">
            <Option className='select-field' value="Electronics">Electronics</Option>
            <Option className='select-field' value="Clothing">Clothing</Option>
            <Option className='select-field' value="Books">Books</Option>
            {/* Add more options as needed */}
          </Select>
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          className='label'
          rules={[{ required: true, message: 'Please enter the product name!' }]}
        >
          <Input className='input-field' placeholder="Enter the product name" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          className='label'
          rules={[{ required: true, message: 'Please enter the product description!' }]}
        >
          <Input.TextArea className='input-field' placeholder="Enter the product description" />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          className='label'
          rules={[{ required: true, message: 'Please enter the product price!' }]}
        >
          <Input type="number" className='input-field' placeholder="Enter the product price" />
        </Form.Item>
        <Form.Item>
          <Button className='button' type="primary" htmlType="submit">
            {productId ? 'Save Changes' : 'Add Product'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default withRouter(ProductForm);

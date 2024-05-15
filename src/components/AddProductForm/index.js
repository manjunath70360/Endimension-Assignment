import React, { useContext, useEffect, useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { withRouter } from 'react-router-dom';
import { ProductContext } from '../../contexts/ProductContext';

import "./index.css"

const { Option } = Select;

const ProductForm = ({ history, match }) => {
  const { products, addProduct, editProduct } = useContext(ProductContext);
  const [form] = Form.useForm();
  const productId = match.params.id;

  useEffect(() => {
    if (productId) {
      const existingProduct = products.find((p) => p.id === Number(productId));
      if (existingProduct) {
        form.setFieldsValue(existingProduct);
      }
    }
  }, [productId, products, form]);

  const onFinish = (values) => {
    if (productId) {
      editProduct(Number(productId), { ...values, id: Number(productId) });
    } else {
      const newProduct = { ...values, id: products.length + 1 }; 
      addProduct(newProduct);
    }
    history.push('/');
  };

  return (
    <div className='product-form-con'>
      <h1 className='head'>{productId ? 'Edit Product' : 'Add Product'}</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ category: '', name: '', description: '', price: '' }}
      >
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
          <Input className='input-field' type="number" placeholder="Enter the product price" />
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

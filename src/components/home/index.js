import React, { useState, useContext } from 'react';
import { Table, Button, Modal, Input, Select } from 'antd';
import { ProductContext } from '../../contexts/ProductContext';
import { Link } from 'react-router-dom';

import "./index.css"

const { Option } = Select;

const ProductList = () => {
  const { products, deleteProduct } = useContext(ProductContext);
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const filteredProducts = products.filter(product => {
    const nameMatch = product.name.toLowerCase().includes(searchText.toLowerCase());
    const descMatch = product.description.toLowerCase().includes(searchText.toLowerCase());
    const categoryMatch = categoryFilter ? product.category === categoryFilter : true;
    return (nameMatch || descMatch) && categoryMatch;
  });

  const columns = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Link to={`/edit-product/${record.id}`}><Button className='btns'>Edit</Button></Link>
          <Button onClick={() => handleDelete(record.id)}>Delete</Button>
        </span>
      ),
    },
  ];

  const handleDelete = (productId) => {
    Modal.confirm({
      title: 'Delete Product',
      content: 'Are you sure you want to delete this product?',
      onOk: () => deleteProduct(productId),
    });
  };

  return (
    <div className='app-container'>
      <h1 className='heading'>Product Management Application</h1>
      <div  style={{ marginBottom: '16px' }}>
        <Link to="/add-product">
          <Button type="primary" className='add-btn'>Add Product</Button>
        </Link>
        <Input
        className='input-search'
          placeholder="Search by name or description"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginLeft: '16px', width: '200px' }}
        />
        <Select
        className='input-select'
          placeholder="Filter by category"
          value={categoryFilter}
          onChange={(value) => setCategoryFilter(value)}
          style={{ marginLeft: '16px', width: '200px' }}
        >
          <Option value="">All Categories</Option>
          {['Electronics', 'Clothing', 'Books'].map(category => (
            <Option key={category} value={category}>{category}</Option>
          ))}
        </Select>
      </div>
      <Table dataSource={filteredProducts} columns={columns} />
    </div>
  );
};

export default ProductList;

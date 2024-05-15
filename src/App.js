import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ProductProvider } from './contexts/ProductContext';
import ProductList from './components/home';
import ProductForm from './components/AddProductForm';

const App = () => (
  <ProductProvider>
    <Router>
      <Switch>
        <Route path="/" exact component={ProductList} />
        <Route path="/add-product" component={ProductForm} />
        <Route path="/edit-product/:id" component={ProductForm} />
      </Switch>
    </Router>
  </ProductProvider>
);

export default App;

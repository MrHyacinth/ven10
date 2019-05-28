import React, { Fragment } from 'react';
import { Router, Route, Switch } from 'react-router';
import { render } from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import ProductAdd from './pages/ProductAdd';
const browserHistory = createBrowserHistory();

render(
  <Fragment>
    <Router history={browserHistory}>
      <Switch>
        <Route exact path="/" component={ProductList} />
        <Route exact path="/detail/:id" component={ProductDetail} />
        <Route exact path="/create" component={ProductAdd} />      
      </Switch>
    </Router>
  </Fragment>,
  document.getElementById('app'),
);

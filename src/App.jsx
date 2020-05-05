import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { decode } from 'jsonwebtoken';
import { useDispatch, useSelector } from 'react-redux';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Login from './containers/Auth/Login/Login';
import Register from './containers/Auth/Register/Register';
import ContactData from './containers/Checkout/ContactData/ContactData';

import { authSuccess } from './store/actions/auth';

const App = () => {
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => ({
    authenticated: state.auth.authenticated,
  }));

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const decoded = token && decode(token);

    if (decoded) {
      dispatch(authSuccess(token, decoded.id));
    }
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/checkout/contact-data" component={ContactData} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>

          <Redirect to={authenticated ? '/' : '/login'} />
        </Layout>
      </BrowserRouter>
    </>
  );
};

export default App;

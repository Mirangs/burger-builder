import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { decode } from 'jsonwebtoken';
import { useDispatch } from 'react-redux';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';

import { authSuccess } from './store/actions/auth';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const idToken = sessionStorage.getItem('idToken');
    const decoded = idToken && decode(idToken);

    if (decoded) {
      dispatch(authSuccess(idToken, decoded.user_id));
    }
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </>
  );
};

export default App;

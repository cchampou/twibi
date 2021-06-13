import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import Dashboard from './pages/dashboard';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;

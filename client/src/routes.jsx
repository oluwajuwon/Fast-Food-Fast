import React from 'react';
import {
  BrowserRouter, Route, Switch,
} from 'react-router-dom';
import Index from './components/Index';
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import NotFound from './components/NotFound';

export default (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

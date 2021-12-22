import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './views/login';
import CheckRoute from './context/route/checkRoute'
import Header from './views/header';
import HomePage from './views/homePage';
import Account from './views/signup';
import Order from './views/order';
import Product from './views/product';
import News from './views/news';


function App() {
    return (
        <Router>
            <Switch>
                <Redirect from="/" to="/login" exact />
                <Route path="/login" component={Login} exact />
                <CheckRoute path="/civilian" component={HomePage} exact />
                <CheckRoute path="/product" component={Product} exact />
                <CheckRoute path="/news" component={News} exact />
                <CheckRoute path="/order" component={Order} exact />
                <CheckRoute path="/account" component={Account} exact />
                <CheckRoute path="/civilians" component={HomePage} exact />
            </Switch>
        </Router>
    );
}
export default App;

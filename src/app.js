import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './views/login';
import CheckRoute from './context/route/checkRoute'
import Header from './views/header';
import HomePage from './views/homePage';
import Account from './views/signup';


function App() {
    return (
        <Router>
            <Switch>
                <Redirect from="/" to="/login" exact />
                <Route path="/login" component={Login} exact />
                <Route path="/civilian" component={HomePage} exact />
                <Route path="/product" component={HomePage} exact />
                <Route path="/news" component={HomePage} exact />
                <Route path="/order" component={HomePage} exact />
                <Route path="/account" component={Account} exact />
                <Route path="/civilians" component={HomePage} exact />
            </Switch>
        </Router>
    );
}
export default App;

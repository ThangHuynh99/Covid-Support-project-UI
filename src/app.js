import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './views/login';
import CheckRoute from './context/route/checkRoute'


function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact/>
                <Route path="/login" component={Login} exact/>
                <CheckRoute path="/home" component={Login} exact/>
            </Switch>
        </Router>
    );
}
export default App;

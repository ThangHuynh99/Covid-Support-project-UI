import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import authorizationAPI from '../../api/authorizationAPI';


function AuthenRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => {

            }}
        ></Route>
    );
}

export default AuthenRoute;

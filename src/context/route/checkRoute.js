import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import authorizationAPI from '../../api/authorizationAPI';


function CheckRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => {
                authorizationAPI.checkToken().then((response) => {
                    if (response.status === "200") {
                        if (JSON.parse(localStorage.getItem('userInfo')).roles[0].roleName !== "USER_ROLE") {
                            return <Component {...props} />;
                        }
                        else {
                            return <Redirect to="/login?message=noPermission" />;
                        }
                    } else {
                        return <Redirect to="/login?message=loginRequired" />;
                    }
                })
            }}
        ></Route>
    );
}

export default CheckRoute;

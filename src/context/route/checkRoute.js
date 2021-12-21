import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import authorizationAPI from '../../api/authorizationAPI';


function CheckRoute({ component: Component, ...rest }) {

    return (
        <Route
            {...rest}
            render={(props) => {
                if (localStorage.getItem('expire') && localStorage.getItem('expire') > moment().format('X')) {
                    if (localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).roles.length > 1) {
                        console.log(JSON.parse(localStorage.getItem('userInfo')).roles[0].roleName);
                        return <Component {...props} />;
                    }
                    else {
                        return <Redirect to="/login?message=noPermission" />;
                    }
                } else {
                    return <Redirect to="/login?message=loginRequired" />;
                }
            }}
        ></Route>
    );
}

export default CheckRoute;

import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {isUserAuthenticated} from  '../utils/api-utils'


const ProtectedRoute = ({component: Component, authenticated, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            isUserAuthenticated() ? (
                <Component {...rest} {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/',
                        state: {from: props.location}
                    }}
                />
            )
        }
    />
);

export default ProtectedRoute
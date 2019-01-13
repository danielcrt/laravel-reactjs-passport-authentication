import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GlobalConstants } from '../_constants';

function hasAccess(){
	let user = JSON.parse(localStorage.getItem(GlobalConstants.USER_KEY));
	return (user && user.data && (user.data.admin == 1));
}
export const AdminRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        	hasAccess()
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)
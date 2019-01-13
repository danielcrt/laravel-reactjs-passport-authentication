import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GlobalConstants } from '../constants';

function hasAccess(){
	let user = JSON.parse(localStorage.getItem(GlobalConstants.USER_KEY));
	return user;
}
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        	hasAccess()
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)

export default PrivateRoute
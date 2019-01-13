import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GlobalConstants } from '../constants';

function isLoggedIn(){
	let user = JSON.parse(localStorage.getItem(GlobalConstants.USER_KEY));
	return user;
}
const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        	isLoggedIn()
            ? <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            : <Component {...props} />
    )} />
)

export default AuthRoute;
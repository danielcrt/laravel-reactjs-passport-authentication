import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from '../helpers';
import { userActions } from '../actions';
import AuthRoute from './AuthRoute';
import PrivateRoute from './PrivateRoute';
import LoginPage from '../pages/Auth/LoginPage'
import RegisterPage from '../pages/Auth/RegisterPage'
import PasswordEmailPage from '../pages/Auth/PasswordEmailPage'
import PasswordResetPage from '../pages/Auth/PasswordResetPage'
import ProfilePage from '../pages/Profile/ProfilePage'
import HomePage from '../pages/HomePage'

class Application extends React.Component {
    constructor(props) {
        super(props);
        
        const { dispatch } = this.props;

        this.axiosResponseInterceptor = window.axios.interceptors.response.use(
            response => {
                return response;
            },
            error => {
                let errorResponse = error.response;
                if (errorResponse.status === 401) {
                    window.axios.interceptors.response.eject(this.axiosResponseInterceptor);
                    dispatch(userActions.logout());
                }
                return Promise.reject(error);
            }
        );
    }
    render() {
        return (
            <Router history={history}>
                <div className="h-100">
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <PrivateRoute path="/profile" component={ProfilePage} location={history.location}/>
                        <AuthRoute path='/login' component={LoginPage} />
		                <Route path="/password/email" component={PasswordEmailPage}/>
		                <Route path="/password/reset/:token" component={PasswordResetPage}/>
		                <AuthRoute path='/register' component={RegisterPage} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default Application
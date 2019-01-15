import React from 'react';
import { connect } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom';
import { history } from '../helpers';
import { alertActions } from '../actions';
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
        history.listen((_location, _action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }
    render() {
        return (
            <Router history={history}>
                <>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <PrivateRoute path="/profile" component={ProfilePage} location={history.location}/>
                        <AuthRoute path='/login' component={LoginPage} />
		                <AuthRoute path='/register' component={RegisterPage} />
		                <Route path="/password/email" component={PasswordEmailPage}/>
		                <Route path="/password/reset/:token" component={PasswordResetPage}/>
                    </Switch>
                </>
            </Router>
        );
    }
}

export default connect()(Application)
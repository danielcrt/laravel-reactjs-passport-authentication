import { userConstants, GlobalConstants } from '../constants';
import { userService } from '../services';
import { history } from '../helpers';
import { alertActions } from './alert.actions'

export const userActions = {
    update,
    loginRedirect,
    register,
    logout
};

function update(user) {
    return dispatch => {
        dispatch(request({ user }));

        userService.updateCurrentUser(user)
            .then(
                response => {
                    if(response.error)
                    {
                        dispatch(failure(response.response_message));
                    } else {
                        dispatch(success(response.user));
                    }
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request(user) { return { type: userConstants.UPDATE_REQUEST, user } }
    function success(user) { return { type: userConstants.UPDATE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }
}

function loginRedirect(email, password) {
    return dispatch => {
        dispatch(request({ email }));

        userService.login(email, password)
            .then(
                user => { 
                    if(user.status_code == 403)
                    {
                        dispatch(failure(user.message));
                        dispatch(alertActions.error(user.message))
                    } else {
                        dispatch(success(user));
                        history.push('/');
                    }
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function register(name, email, password, password_confirmation) {
    return dispatch => {
        dispatch(request({ email }));

        userService.register(name, email, password, password_confirmation)
            .then(user => { 
                    if(user.error)
                    {
                        dispatch(alertActions.error(user.response_message));
                    } else {
                        dispatch(success(user));
                        history.push('/');
                    }
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function logout() {
    return dispatch => {
        dispatch(request({ }));

        userService.logout()
            .then(_response => { 
                    // remove user from local storage to log user out
                    localStorage.removeItem(GlobalConstants.USER_KEY);
                    history.push('/');
                    dispatch(success());
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGOUT_REQUEST, user } }
    function success() { return { type: userConstants.LOGOUT_SUCCESS } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

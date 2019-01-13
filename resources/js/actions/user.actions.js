import { userConstants } from '../constants';
import { userService } from '../services';
import { history } from '../helpers';

export const userActions = {
    update,
    login,
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

function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));

        userService.login(email, password)
            .then(
                user => { 
                    if(user.error)
                    {
                        dispatch(failure(user.message));
                    } else {
                        dispatch(success(user));
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

function loginRedirect(email, password) {
    return dispatch => {
        dispatch(request({ email }));

        userService.login(email, password)
            .then(
                user => { 
                    if(user.error)
                    {
                        dispatch(failure(user.message));
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

function register(firstName, lastName, phone, email, dob, gender, password) {
    return dispatch => {
        dispatch(request({ email }));

        userService.register(firstName, lastName, phone, email, dob, gender, password)
            .then(
                user => { 
                    if(user.error)
                    {
                        dispatch(failure(user.message));
                    } else {
                        dispatch(success(user));
                        history.push('/');
                    }
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

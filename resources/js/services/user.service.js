import { authHeader } from '../helpers';
import { GlobalConstants } from '../constants';
import Http from '../helpers/Http';

export const userService = {
    login,
    register,
    passwordEmail,
    passwordReset,
    getCurrentUser,
    logout
};

function formatDate(date) {
    var d = new Date(date),
        month = '' + d.getMonth(),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
function getCurrentUser(token, successCallback,errCallback) {
    const config = {     
        headers: { 'Authorization': 'Bearer '+token }
    };

    Http('token',config)
      .then(function (response) {
        if(response.error)
        {
            errCallback(response.data);
        } else {
            successCallback(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

}

function login(email,password) {

    const formData = new FormData();
    formData.append('email',email);
    formData.append('password',password);

    const config = {     
        headers: { 'Content-Type': 'application/json' }
    };

    return Http.post('login', formData,config)
      .then(function (response) {
        let user = response.data;
        if (user) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem(GlobalConstants.USER_KEY, JSON.stringify(user));
        } else {
            window.scrollTo(0, 0);
        }

        return user;
      })
      .catch(function (error) {
        console.log(error);
      });
}

function passwordEmail(email, successCallback, errCallback) {

    const formData = new FormData();
    formData.append('email',email);

    const config = {     
        headers: { 'Content-Type': 'application/json' }
    };

    Http.post(GlobalConstants.API_URL+'/auth/password/email', formData,config)
      .then(function (response) {
        successCallback(response);
      })
      .catch(function (error) {
        errCallback(error);
      });
}

function passwordReset(email,password, password_confirmation, token, successCallback, errCallback) {

    const formData = new FormData();
    formData.append('email',email);
    formData.append('password',password);
    formData.append('password_confirmation',password_confirmation);
    formData.append('token',token);

    const config = {     
        headers: { 'Content-Type': 'application/json' }
    };

    Http.post(GlobalConstants.API_URL+'/auth/password/reset', formData,config)
      .then(function (response) {
        successCallback(response.data);
      })
      .catch(function (error) {
        errCallback(error);
      });
}

function register(name, email, password) {

    const formData = new FormData();
    formData.append('name',name);
    formData.append('email',email);
    formData.append('password',password);

    const config = {     
        headers: { 'Content-Type': 'application/json' }
    };

    return Http.post(GlobalConstants.API_URL+'/auth/register', formData,config)
      .then(function (response) {
        let user = response.data;
        if (user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem(GlobalConstants.USER_KEY, JSON.stringify(user));
        } else {
            window.scrollTo(0, 0);
        }

        return user;
      })
      .catch(function (error) {
        console.log(error);
      });
}
function logout() {
    return Http.post('logout')
      .then(function (response) {
        // remove user from local storage to log user out
        localStorage.removeItem(GlobalConstants.USER_KEY);
      })
      .catch(function (error) {
        console.log(error);
        
      });
}
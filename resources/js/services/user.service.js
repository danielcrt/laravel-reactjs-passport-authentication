import { GlobalConstants } from '../constants';
import Http from '../helpers/Http';

export const userService = {
    login,
    register,
    passwordEmail,
    passwordReset,
    logout
};

function login(email,password) {

    const formData = new FormData();
    formData.append('email',email);
    formData.append('password',password);

    return Http.post('login', formData)
      .then(function (response) {
        let user = response.data.data;
        if (user) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem(GlobalConstants.USER_KEY, JSON.stringify(user));
        } else {
            window.scrollTo(0, 0);
        }

        return user;
      })
      .catch(function (error) {
        if(error.response.data.status_code === 403) {
          return error.response.data;
        }
      });
}

function passwordEmail(email, successCallback, errCallback) {

    const formData = new FormData();
    formData.append('email',email);

    Http.post('password/email', formData)
      .then(function (response) {
        if(response.data.error) {
          errCallback(response.data);
        } else {
          successCallback(response);
        }
      })
      .catch(function (error) {
        errCallback(error.response.data);
      });
}

function passwordReset(email,password, password_confirmation, token, successCallback, errCallback) {

    const formData = new FormData();
    formData.append('email',email);
    formData.append('password',password);
    formData.append('password_confirmation',password_confirmation);
    formData.append('token',token);

    Http.post('password/reset', formData)
      .then(function (response) {
        console.log(response);
        if(response.data.data && response.data.data.error) {
          errCallback(response.data.data);
        } else {
          successCallback(response.data);
        }
      })
      .catch(function (error) {
        if(error && error.response) {
          errCallback(error.response.data);
        }
      });
}

function register(name, email, password, password_confirmation, validationCallback) {

    const formData = new FormData();
    formData.append('name',name);
    formData.append('email',email);
    formData.append('password',password);
    formData.append('password_confirmation',password_confirmation);

    return Http.post('register', formData)
      .then(function (response) {
        if(response.data.error) {
            return response.data;
        }
        let user = response.data.data;
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
function logout() {
    return Http.post('logout')
      .then(function (response) {
          return response;
      })
      .catch(function (error) {
        console.log(error);
        
      });
}
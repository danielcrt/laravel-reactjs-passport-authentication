import { userConstants, GlobalConstants } from '../constants';

let user = JSON.parse(localStorage.getItem(GlobalConstants.USER_KEY));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
    case userConstants.REGISTER_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
    case userConstants.REGISTER_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
    case userConstants.REGISTER_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    case userConstants.UPDATE_SUCCESS:
      return {
        loggedIn: true,
        user: {
          token: state.user.token,
          data: action.user
        }
      };
    default:
      return state
  }
}
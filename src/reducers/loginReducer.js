import { SET_LOGIN_PENDING, SET_LOGIN_SUCCESS, SET_LOGIN_ERROR,SET_LOGOUT} from '../actions/types';

export default function reducer(state = [], action) {
      console.log("Accion: " + action.type)
    switch (action.type) {
      case SET_LOGIN_PENDING:
        return Object.assign({}, state, {
          isLoginPending: action.isLoginPending
        });
  
      case SET_LOGIN_SUCCESS:
        return Object.assign({}, state, {
          isLoginSuccess: action.isLoginSuccess,
          isLogout: false
        });
  
      case SET_LOGIN_ERROR:
        return Object.assign({}, state, {
          loginError: action.loginError
        });

        case SET_LOGOUT:
        console.log("Entré Logout")
        return Object.assign({},state,{
          isLogout: action.logout
        });
  
      default:     
        return state;
    }
  }
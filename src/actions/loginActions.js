import { SET_LOGIN_PENDING,SET_LOGIN_SUCCESS,SET_LOGIN_ERROR } from './types';

function callLoginApi(email, password, callback) {
   
    setTimeout(() => {
      if (email === 'admin@example.com' && password === 'admin') {
        return callback(null);
      } else {
        return callback(new Error('Invalid email and password'));
      }
    }, 1000);
  }

  

function setLoginPending(isLoginPending) {
    return {
      type: SET_LOGIN_PENDING,
      isLoginPending
    };
  }
  
  function setLoginSuccess(isLoginSuccess) {
    return {
      type: SET_LOGIN_SUCCESS,
      isLoginSuccess
    };
  }
  
  function setLoginError(loginError) {
      console.log("Entre acá "+ loginError )
    return {
      type: SET_LOGIN_ERROR,
      loginError
    }
  }

  export function login(email, password) {     
    return dispatch => {
      dispatch(setLoginPending(true));
      dispatch(setLoginSuccess(false));
      dispatch(setLoginError(null));
  
      callLoginApi(email, password, error => {
        dispatch(setLoginPending(false));       
        if (!error) {
          dispatch(setLoginSuccess(true));
        } else {
          dispatch(setLoginError(error));
        }
      });
    }
  }

  export const initAppLogin = ()=>{
    return dispatch => {       
        dispatch(setLoginSuccess(false));       
    }
  }

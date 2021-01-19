import * as actionTypes from "./actionTypes";
import * as actions from "./index";

export const initLogin = () => {
  return {
    type: actionTypes.LOGIN_INIT
  }
};

export const loginFail = () => {
  return {
    type: actionTypes.LOGIN_FAIL,
    error: "Dica: admin / admin"
  }
}

export const login = (credentials) => {
  return dispatch => {
    if (credentials.username === "admin" && credentials.password === "admin") {
      dispatch(initLogin());
      dispatch(actions.getDragonsList());
    } else {
      dispatch(loginFail());
    }
  }
}





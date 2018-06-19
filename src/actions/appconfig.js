import {FETCH_APPCONFIGS_DEFAULT} from './types';
import {request,requestWithToken} from "./request.js";

export function fetchDefaultAppConfig() {
  return (dispatch) => {
    return requestWithToken('/app_configs/city/', 'GET')
      .then((response) => {
        dispatch({
          type: FETCH_APPCONFIGS_DEFAULT,
          payload: response.data
        })
      })
  }
}

export function editAppConfig(appConfig, id) {
  return (dispatch) => {
    return requestWithToken('/app_configs/' + id, 'PUT', {appConfig})
  }
}

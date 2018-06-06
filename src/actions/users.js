import {FETCH_USERS} from './types';
import {requestWithToken} from "./request.js";

export function fetchUsers() {
  return (dispatch) => {
    return requestWithToken('/users', 'GET')
      .then((response) => {
        dispatch({
          type: FETCH_USERS,
          payload: response.data
        })
      })
  }
}

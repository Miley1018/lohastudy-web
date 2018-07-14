import axios from 'axios';
import {AUTH_USER,UNAUTH_USER,AUTH_SIGNINERROR} from './types';


import CONFIG from '../config'

export function signin(email, password){
    return function(dispatch) {
      return axios.post(`${CONFIG.apiHost}//users/login`, {user: {email: email, password: password}})
        .then(response => {
          localStorage.setItem('token', response.data.user.token);
          dispatch({type: AUTH_USER});
        }).then(() => {
          location.href = '/'
        }).catch((error) => {
          console.log(error)
          for (let key in error.response.data.errors) {
            dispatch(authError(key + ' ' + error.response.data.errors[key]))
          }
        })
    }
}

export function signout(){
    localStorage.removeItem('token');
    return{
        type:UNAUTH_USER
    }
}

export function authError(error){
    return{
        type:AUTH_SIGNINERROR,
        payload:error
    }
}

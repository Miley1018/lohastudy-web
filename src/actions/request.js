import axios from 'axios';

import CONFIG from '../config'
const host = CONFIG.apiHost
export function requestWithToken(url, method, content) {
  const config = {
    url: host + url,
    method: method,
    headers: {
      Authorization: 'Bearer '+localStorage.getItem('token')},
  }
  if (method.toLowerCase() == 'get') {
    config.params = content
  } else {
    config.data = content
  }
  return axios(config).then().catch(error => {
    if (error.response.status === 401) {
      location.href = '/signin'
      return
    }
    alert(error.response.data.errors.message)
  })
}

export function request(url, method, content) {
  const config = {
    url: host + url,
    method: method,
  }
  if (method.toLowerCase() == 'get') {
    config.params = content
  } else {
    config.data = content
  }
  return axios(config).then().catch(error => {
    console.log(error)
  })
}


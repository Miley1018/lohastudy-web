import axios from 'axios';

let host = 'https://lohastudy.com/prod/api'
export function requestWithToken(url, method, content) {
    return axios(
        {
            url: host + url,
            method: method,
            headers: {
                Authorization: 'Bearer '+localStorage.getItem('token')},
            data: content
        }
    ).then().catch(error => {
        if (error.response.status === 401) {
            location.href = '/signin'
          return
        }
        alert(error.response.data.errors.message)
    })
}

export function request(url, method, content) {
      return axios(
        {
          url: host + url,
          method: method,
          data: content
        }
      ).then().catch(error => {
        console.log(error)
  })
}

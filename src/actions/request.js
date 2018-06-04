import axios from 'axios';

let host = 'https://lohastudy.com/dev/api'
export function requestWithToken(url, content, method) {
    return axios(
        {
            url: host + url,
            method: method,
            headers: {
                Authorization: 'Bearer '+localStorage.getItem('token')},
            data: content
        }
    ).then().catch(error => {
        // if (error.response.status === 401) {
        //     location.href = '/signin'
        // }
        console.log(error)
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

import axios from 'axios';

export default function(query) {
    return axios({
      url: 'http://api.v0.logiwork.com:8001/graphql',
        method: 'post',
        headers: {
        Authorization: 'Bearer '+localStorage.getItem('token')
    }, data: query})
    .then(response =>
        response.data)
        .catch((error) => {
            if (error.response.status === 401) {
                location.href = '/signin'
            }
            console.log(error)
        })
}
let host = 'https://api.v0.logiwork.com/api/private'
export function request_noGraphql(url, content) {
    return axios(
        {
            url: host + url,
            method: 'post',
            headers: {
                Authorization: 'Bearer '+localStorage.getItem('token')},
            data: content
        }
    ).then().catch(error => {
        if (error.response.status === 401) {
            location.href = '/signin'
        }
        console.log(error)
    })
}

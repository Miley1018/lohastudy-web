import COS from 'cos-js-sdk-v5'
import axios from 'axios'
const Bucket = 'lohastudy-1256370191'
const Region = 'ap-guangzhou';

// 初始化实例
const cos = new COS({
  getAuthorization: function (options, callback) {
    // 异步获取签名
    const method = (options.Method || 'get').toLowerCase()
    const pathname = '/' + (options.Key || '')
    axios({
      url:'https://lohastudy.com/dev/api/cos/auth',
      headers: {
        Authorization: 'Bearer '+localStorage.getItem('token')},
      params:{
        method: method,
        pathname: pathname,
      },
      responseType: 'text',
    }).then(response=> {
      callback(response.data)
    }).catch(error => {
      if (error.response.status === 401) {
        location.href = '/signin'
      }
      console.log(error)
    })
  }
});

export default {
   uploadFile(file){
    return new Promise((resolve, reject)=>{
      cos.sliceUploadFile({
        Bucket: Bucket,
        Region: Region,
        Key: new Date().valueOf() + '-' + Math.floor(Math.random() *1000) + '-' + file.name,
        Body: file,
      }, function (err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      });
    })
  }
}

import COS from 'cos-js-sdk-v5'
import axios from 'axios'
const Bucket = 'test-1256370191'
const Region = 'ap-guangzhou';

// 初始化实例
const cos = new COS({
  getAuthorization: function (options, callback) {
    // 异步获取签名
    const method = (options.Method || 'get').toLowerCase()
    const pathname = '/' + (options.Key || '')
    axios({
      url:'http://localhost:9001/api/cos/auth',
      params:{
        method: method,
        pathname: pathname,
      },
      responseType: 'text',
    }).then(response=>callback(response.data))
  }
});

export default {
  async uploadFile(file){
    return new Promise((resolve, reject)=>{
      cos.sliceUploadFile({
        Bucket: Bucket,
        Region: Region,
        Key: file.name,
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

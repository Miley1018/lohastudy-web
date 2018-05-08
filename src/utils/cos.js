import COS from 'cos-js-sdk-v5'
const Bucket = 'test-1256370191'
const Region = 'ap-guangzhou';

// 初始化实例
const cos = new COS({
  getAuthorization: function (options, callback) {
    // 异步获取签名
    $.get('../server/auth.php', {
      method: (options.Method || 'get').toLowerCase(),
      pathname: '/' + (options.Key || '')
    }, function (authorization) {
      callback(authorization);
    }, 'text');
  }
});

// 监听选文件
document.getElementById('file-selector').onchange = function () {

  var file = this.files[0];
  if (!file) return;

  // 分片上传文件
  cos.sliceUploadFile({
    Bucket: Bucket,
    Region: Region,
    Key: file.name,
    Body: file,
  }, function (err, data) {
    console.log(err, data);
  });

};

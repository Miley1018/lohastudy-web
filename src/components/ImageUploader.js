import React from 'react'
import cos from "../utils/upload";

export default class ImageUploader extends React.Component {
  constructor(props) {
    super(props)
    this.onImagesChange = this.onImagesChange.bind(this)
  }
  onImagesChange(e) {
    if (e.target.files) {
      cos.uploadFile(e.target.files[0]).then(response => {
        const newImage = 'http://' + response.Location
        this.props.onImageChange && this.props.onImageChange(newImage)
      }).catch(console.error)
    }
  }
  render() {
    return <div className='form-group row'>
      <label className='form_label col-sm-2 col-form-label'>图片</label>
      <div className='d-flex flex-column'>
        <div className='d-flex'>
          <div id="hide" className="col-sm-5 ml-0">
            <label>{this.props.image ? '更换图片':'添加图片'}
              <input type="file" id="file" name="file"
                     accept=".jpg, .jpeg, .png, .gif"
                     onChange={this.onImagesChange.bind(this)}/>
            </label>
          </div>
          <div className='col-sm-7' style={{marginLeft: '5px', fontSize: '0.8em'}}>注：Banner尺寸为314*180，图片为PNG
            or JPG，图片大小建议小于100k。仅可添加一张图片
          </div>
        </div>
        <div className='mt-2 ml-0'>
          <img style={{width: '300px',maxHeight:'300px'}} src={this.props.image} accept="image/*"/>
        </div>
      </div>
    </div>
  }
}

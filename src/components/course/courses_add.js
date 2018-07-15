import React, {Component} from 'react';
import {connect} from 'react-redux';
import {editCourse,fetchCourseTags, addCourse, fetchCourse} from '../../actions/courses';
import Footer from '../footer'
import Header from '../header'
import cos from '../../utils/upload'
import TcMap from '../tcMap'
import Tags from './tags'
import DatePicker from 'react-datepicker'
import moment from 'moment';

class Courses_add extends Component {
  constructor(props) {
    super(props)
    this.state = {
      course: {
        tags:[],
        categories:[],
        images:[],
        items:[],
        location:{type:'Point',coordinates:[
          0,//lng
            0,//lat
          ]}
      },
      edit: false
    }
    this.onPoiSelected = this.onPoiSelected.bind(this)
    this.onValueChange = this.onValueChange.bind(this)
    this.onTagsChanged = this.onTagsChanged.bind(this)
  }
  componentWillMount() {
    this.props.fetchCourseTags()
    this.props.match.params.id &&  this.props.fetchCourse(this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps) {
    nextProps.course &&
    this.setState({
      course: {
        ...nextProps.course,
        tags: nextProps.course.tags.map(t=>t.id),
        categories: nextProps.course.categories.map(c=>c.id),
      },
      edit: true
    })
  }
  setCourseField(key, value) {
    const course = this.state.course
    course[key] = value
    this.setState({course})
  }
  onTagsChanged(tagIds, categoryIds){
    const course = this.state.course
    course.tags = tagIds
    course.categories = categoryIds
    this.setState({course})
  }

  addCourseContains(e) {
    e.preventDefault()
    const course = this.state.course
    course.items = [...course.items, '']
    this.setState({course})
  }
  onCourseContainsChange(e) {
    let newContains = this.state.course.items
    newContains[Number(e.target.name)] = e.target.value
    this.setState({
      course: this.state.course
    })
  }
  deleteOneCourseContains(index) {
    if (index > -1) {
      this.state.course.items.splice(index, 1);
    }
    this.setState({
      course: this.state.course
    })
  }
  renderCourseContainsList() {
    let courseContainsList = []
    for (let i = 0; i < this.state.course.items.length; i ++) {
      courseContainsList.push(
        <div className='d-flex' key={i}>
          <div className='col-sm-1'>{i + 1}、</div>
          <textarea className="form-control mt-2" name={i}
                    onKeyUp={this.auto_grow.bind(this)}
                    style={{height:'60px'}}
                    onChange={this.onCourseContainsChange.bind(this)}
                    value={this.state.course.items[i]}/>
          <button
            onClick={this.deleteOneCourseContains.bind(this, i)}
            className="btn btn-outline-dark my-2 mx-3 my-sm-2"
            type="button"
            style={{borderColor: '#5a5a5a', color: '#5a5a5a', width: '150px'}}
          >删除</button>
        </div>
      )
    }
    return courseContainsList
  }

  onValueChange(e) {
    const course = this.state.course
    course[e.target.name] = e.target.value
    this.setState({course})
  }
  onPoiSelected(poi) {
    const course = this.state.course
    course.address = poi.address
    course.poiName = poi.name
    course.location.coordinates[0] = poi.latLng.lng
    course.location.coordinates[1] = poi.latLng.lat
    this.setState({course})
  }

  auto_grow(element) {
    const row = 60
    element.target.style.height = 'auto';
    element.target.style.height = (element.target.scrollHeight > row ? element.target.scrollHeight : row) + "px";
  }
  onImagesChange(e) {
    if (e.target.files) {
      for (let i = 0; i < e.target.files.length; i ++) {
        cos.uploadFile(e.target.files[i]).then(response => {
          const course = this.state.course
          course.images = [...course.images, 'http://' + response.Location]
          this.setState({course})
        }).catch(console.error)
      }
    }
  }
  onSubmitAddCourse(e) {
    e.preventDefault()
    let hasTag = true
    const course = this.state.course
    course.tags.forEach((id) => {
      if (id == '') {
        hasTag = false
      }
    })
    if (course.tags.length === 0 || hasTag == false) {
      alert('请至少选择一个二级品类。')
      return
    }

    let hasImage = true
    course.images.forEach((image) => {
      if (image == '') {
        hasImage = false
      }
    })
    if (course.images.length === 0 || hasImage == false) {
      alert('请至少添加一张图片。')
      return
    }

    if (course.location.coordinates[0] == null || course.location.coordinates[1] == null) {
      alert('请点击地图的搜索按钮，或在地图上标注课程地址，以确认您输入的地址有效，并正确标注在地图上。')
      return
    }

    if (this.state.edit) {
      this.props.editCourse(course, this.props.match.params.id).then(() => this.props.history.push('/courses/'))
      return
    }
    this.props.addCourse(course).then(() => this.props.history.push('/courses/'))
  }
  renderImages() {
    let imagesRenderList = []
    for (let i = 0; i < this.state.course.images.length; i ++) {
      imagesRenderList.push(
        <div key={i} className='mt-2 ml-0' >
        <img style={{width: '500px'}} src={this.state.course.images[i]} accept="image/*"/>
        <button
          onClick={this.deleteOneImage.bind(this, i)}
          className="btn btn-outline-dark my-2 mx-3 my-sm-2"
          type="button"
          style={{borderColor: '#5a5a5a', color: '#5a5a5a', width: '150px'}}
        >删除</button>
      </div>)
    }
    return imagesRenderList
  }
  deleteOneImage(index) {
    if (index > -1) {
      this.state.course.images.splice(index, 1);
    }
    this.setState({
      course: this.state.course
    })
  }
  render() {
    if (!this.props.authenticated) {
      return <div></div>
    }
    const course = this.state.course
    return (
      <div className='pageWrap'>
        <Header/>
        <div className='flexGrow'>
          <h3 style={{textAlign: 'left', margin: '15px 25px'}}>新增课程</h3>
          <hr className="style-two"/>
          <div className='mainBody'>
            <form name='formSubmit' className='mainBody_form' onSubmit={this.onSubmitAddCourse.bind(this)}>
              <div className='form-group row'>
                <label className='form_label col-sm-2 col-form-label'>名称</label>
                <div className='col-sm-5 d-flex'>
                  <input className="form-control col-sm-10"
                         name='title'
                         onChange={this.onValueChange.bind(this)}
                         maxLength='30'
                         value={course.title}
                         required
                         autoFocus/>
                  <div className='d-flex align-items-center'>
                    <div style={{marginLeft: '5px'}}>最大字数20</div>
                  </div>
                </div>
              </div>

              <div className='form-group row'>
                <label className='form_label col-sm-2 col-form-label'>品类</label>
                <div className='col-sm-6 d-flex flex-column'>
                  <Tags tags={this.state.course.tags} onTagsChanged={this.onTagsChanged}/>
                </div>
              </div>

              <div className='form-group row'>
                <label className='form_label col-sm-2 col-form-label'>图片</label>
                <div className='d-flex flex-column'>
                  <div id="hide" className="col-lg-8 col-xs-8 ml-0">
                    <label>添加图片
                      <input type="file" id="file" name="file"
                             accept=".jpg, .jpeg, .png, .gif"
                             onChange={this.onImagesChange.bind(this)}
                             multiple/>
                    </label>
                    <div>{this.renderImages()}</div>
                  </div>
                </div>
              </div>

              <div className='form-group row'>
                <label className='form_label col-sm-2 col-form-label'>商圈</label>
                <div className='col-sm-5'>
                  <input className="form-control" value={course.place} onChange={this.onValueChange} name="place" required/>
                </div>
              </div>

              <div className='form-group row'>
                <label className='form_label col-sm-2 col-form-label'>课程时长</label>
                <div className='col-sm-2 d-flex'>
                  <input className="form-control col-sm-10" name='duration' type="number" value={course.duration}
                                                        step="any" onChange={this.onValueChange}/>
                  <div className='d-flex align-items-center'>
                    <div style={{marginLeft: '5px'}}>小时</div>
                  </div>
                </div>
              </div>

              <div className='form-group row'>
                <label className='form_label col-sm-2 col-form-label'>课程单价</label>
                <div className='col-sm-2 d-flex'>
                  <input className="form-control  col-sm-10" name='price' type="number"
                         value={course.price}
                                                        step="any" onChange={this.onValueChange.bind(this)} required/>
                  <div className='d-flex align-items-center'>
                    <div style={{marginLeft: '5px'}}>元</div>
                  </div>
                </div>
              </div>

              <div className='form-group row'>
                <label className='form_label col-sm-2 col-form-label'>课程内容</label>
                <div className='col-sm-5'>
                  <textarea className="form-control" id='courseInfo' name='content'
                            value={course.content}
                            style={{height: '60px'}}
                            onKeyUp={this.auto_grow.bind(this)}
                            onChange={this.onValueChange.bind(this)}/>
                </div>
              </div>

              <div className='form-group row'>
                <label className='form_label col-sm-2 col-form-label'>课程內包含</label>
                <div className='col-sm-5 d-flex flex-column'>
                  {this.renderCourseContainsList()}
                  <div className='d-flex'>
                    <button onClick={this.addCourseContains.bind(this)}
                            className="btn btn-outline-dark my-2 mx-0 my-sm-2"
                            type="button"
                            style={{borderColor: '#5a5a5a', color: '#5a5a5a', width: '150px'}}>添加更多
                    </button>
                  </div>
                </div>
              </div>

              <div className='form-group row'>
                <label className='form_label col-sm-2 col-form-label'>课程地点</label>
                <div className='col-sm-10' style={{textAlign: 'left'}}>
                  POI: <input className="form-control" name="poiName" value={course.poiName} onChange={this.onValueChange}/>
                  具体地址: <input className="form-control" name="address" value={course.address} onChange={this.onValueChange}/>
                  经纬度: <input className="form-control" value={course.location.coordinates.join(',')} disabled={true} />
                  请使用地图搜索获取准确的地址和坐标，地址可以手动编辑，坐标只能通过地图获取：
                  <TcMap onPoiClick={this.onPoiSelected}/>
                </div>
              </div>

              <div className='form-group row'>
                <label className='form_label col-sm-2 col-form-label'>备注</label>
                <div className='col-sm-5'>
                  <textarea className="form-control" id='otherInfo' name='note' value={course.note}
                            onKeyUp={this.auto_grow.bind(this)}
                            style={{height: '60px'}}
                            onChange={this.onValueChange.bind(this)}/>
                </div>
              </div>
              <div className='form-group row'>
                <label className='form_label col-sm-2 col-form-label'>有效期</label>
                <div className='col-sm-5'>
                  上线时间
                  <DatePicker
                    selected={course.onlineStartDate?moment(course.onlineStartDate):undefined}
                    onChange={(date)=>this.setCourseField('onlineStartDate', date)}
                  />
                  下线时间
                  <DatePicker
                    selected={course.onlineEndDate?moment(course.onlineEndDate):undefined}
                    onChange={(date)=>this.setCourseField('onlineEndDate', date)}
                  />
                </div>
              </div>

              <div className='form-group row'>
                <label className='form_label col-sm-2 col-form-label'> </label>
                <div className='col-sm-5'>
                  <button className="btn btn-outline-success my-2 mx-4 my-sm-0" style={{width: '100px'}} type='submit'
                          name='formSubmit'>提交
                  </button>
                  <button className="btn btn-outline-success my-2 mx-4 my-sm-0" style={{width: '100px'}}
                          onClick={() => this.props.history.push('/courses')}>取消
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    tags: state.courses.tags,
    course: state.courses.course
  }
}
export default connect(mapStateToProps,{editCourse, fetchCourseTags, addCourse, fetchCourse})(Courses_add)


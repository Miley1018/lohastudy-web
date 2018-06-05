import React, {Component} from 'react';
import {connect} from 'react-redux';
import {editCourse,fetchCourseTags, addCourse, fetchCourse} from '../actions/courses';
import Footer from './footer'
import Header from './header'
import cos from '../utils/upload'

class Courses_add extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title:'',
      categoryIds: [],
      tagIds: [],
      images:[],
      place: '',
      price:'',
      duration: '',
      content: '',
      courseContains: [],
      mapSearchCity: '',
      mapSearchAfterCity: '',
      lng: null,
      lat: null,
      note:null,
      mapHasAuto: false,
      mapSearchCity_mapAuto: '',
      mapSearchAfterCity_mapAuto: '',
      edit: false
    }
  }
  componentWillMount() {
    this.props.fetchCourseTags()
    this.props.match.params.id &&  this.props.fetchCourse(this.props.match.params.id)
  }
  componentDidMount() {
    let BMap = window.BMap
    var map = new BMap.Map("allmap");            // 创建Map实例
    var point = new BMap.Point(120.207947,30.247883); // 创建点坐标
    map.centerAndZoom(point,12);
    map.enableScrollWheelZoom();                 //启用滚轮放大缩小

    var myGeo = new BMap.Geocoder();
    // 将地址解析结果显示在地图上,并调整地图视野

    var geoc = new BMap.Geocoder();
    map.addEventListener("click", (e) => {
      var pt = e.point;
      map.clearOverlays();
      geoc.getLocation(pt, (rs) => {
        var addComp = rs.addressComponents;
        let lngLat = this.bd09_To_Gcj02(pt.lng, pt.lat)
        let lngGcj02 = lngLat['tempLon']
        let latGcj02 = lngLat['tempLat']
        this.setState({
          mapSearchCity: addComp.province + ", " + addComp.city,
          mapSearchAfterCity: addComp.district + ", " + addComp.street + ", " + addComp.streetNumber,
          lng: lngGcj02,
          lat: latGcj02
        })

        var point = new BMap.Point(e.point.lng,e.point.lat);
        map.centerAndZoom(point,16);
        var marker = new BMap.Marker(point);// 创建标注
        map.addOverlay(marker);             // 将标注添加到地图中
        marker.enableDragging();
        marker.addEventListener("dragend", (e) => {
          var pt = e.point;
          let lngLat = this.bd09_To_Gcj02(pt.lng, pt.lat)
          let lngGcj02 = lngLat['tempLon']
          let latGcj02 = lngLat['tempLat']
          geoc.getLocation(pt, (rs) => {
            var addComp = rs.addressComponents;
            this.setState({
              mapSearchCity: addComp.province + ", " + addComp.city,
              mapSearchAfterCity: addComp.district + ", " + addComp.street + ", " + addComp.streetNumber,
              lng: lngGcj02,
              lat: latGcj02
            })
          })
        })
      })
    })
  }
  componentWillReceiveProps(nextProps) {
    nextProps.course &&
    this.setState({
      title: nextProps.course.title,
      categoryIds: nextProps.course.categories.map(category => category.id),
      tagIds: nextProps.course.tags.map(tag => tag.id),
      images:nextProps.course.images,
      place: nextProps.course.place,
      price:nextProps.course.price,
      duration: nextProps.course.duration,
      content: nextProps.course.content,
      courseContains: nextProps.course.items,
      mapSearchCity: nextProps.course.concreteAddress && nextProps.course.concreteAddress.city,
      mapSearchAfterCity: nextProps.course.concreteAddress && nextProps.course.concreteAddress.detail,
      lng: nextProps.course.location.coordinates.lng,
      lat: nextProps.course.location.coordinates.lat,
      note:nextProps.course.note,
      edit: true
    }, () => {
      if ((nextProps.course.concreteAddress && nextProps.course.concreteAddress.city)
        && (nextProps.course.concreteAddress && nextProps.course.concreteAddress.detail)) {
        this.onMapSearch()
      }
      console.log('init',this.state)
    })
  }
  addTagsSelection(e) {
    e.preventDefault()
    if (this.props.tags && Object.keys(this.props.tags) && Object.keys(this.props.tags).length !== 0) {
      let key1 = Object.keys(this.props.tags)[0]
      this.setState({
        categoryIds: [...this.state.categoryIds, this.props.tags[key1]['category']],
        tagIds: [...this.state.tagIds, this.props.tags[key1]['id']]
      }, ()=> console.log(1,this.state))
    }
  }
  onSelectChange(e) {
    let ids = e.target.value.split('/')
    console.log('tagValue',ids,e.target.name)
    let categoryIds = this.state.categoryIds
    let tagIds = this.state.tagIds
    categoryIds[Number(e.target.name)] = ids[0]
    tagIds[Number(e.target.name)] = ids[1]
    this.setState({
      categoryIds: categoryIds,
      tagIds: tagIds
    }, ()=> console.log(this.state))
  }
  renderTagsSelectionList() {
    let tagsSelectionList = []
    for (let i = 0; i < this.state.tagIds.length; i ++) {
      tagsSelectionList.push(
        <div className='d-flex' key={i}>
          <select id="tagsSelect" className="form-control col-sm-8 mt-2"
                  name={i}
                  onChange={this.onSelectChange.bind(this)}
                  style={{textAlignLast: 'center'}}>
            {this.renderTagsSelection(this.state.tagIds[i])}
          </select>
          <button
            onClick={this.deleteOneTagsSelection.bind(this, i)}
            className="btn btn-outline-dark my-2 mx-3 my-sm-2"
            type="button"
            style={{borderColor: '#5a5a5a', color: '#5a5a5a', width: '150px'}}
          >删除</button>
        </div>
      )
    }
    return tagsSelectionList
  }
  deleteOneTagsSelection(index) {
    if (index > -1) {
      this.state.categoryIds.splice(index, 1);
      this.state.tagIds.splice(index, 1);
    }
    this.setState({
      categoryIds: this.state.categoryIds,
      tagIds: this.state.tagIds
    }, () => console.log(1, this.state))
  }
  renderTagsSelection(selectedTagId) {
    let tagsList = []
    if (this.props.tags && Object.keys(this.props.tags) && Object.keys(this.props.tags).length !== 0) {
      for (let key in this.props.tags) {
        tagsList.push(
          <option key={key}
                  selected={selectedTagId == key ?  true: false}
                  value={this.props.tags[key].category+ '/' +this.props.tags[key].id}>
            {this.props.tags[key].name}
          </option>
        )
      }
    }
    return tagsList
  }

  addCourseContains(e) {
    e.preventDefault()
    this.setState({
      courseContains: [...this.state.courseContains, null]
    })
  }
  onCourseContainsChange(e) {
    let newContains = this.state.courseContains
    newContains[Number(e.target.name)] = e.target.value
    this.setState({
      courseContains: newContains
    })
  }
  deleteOneCourseContains(index) {
    if (index > -1) {
      this.state.courseContains.splice(index, 1);
    }
    this.setState({
      courseContains: this.state.courseContains
    }, () => console.log(1, this.state))
  }
  renderCourseContainsList() {
    let courseContainsList = []
    for (let i = 0; i < this.state.courseContains.length; i ++) {
      courseContainsList.push(
        <div className='d-flex' key={i}>
          <div className='col-sm-1'>{i + 1}、</div>
          <textarea className="form-control mt-2" name={i} onChange={this.onCourseContainsChange.bind(this)}
                    value={this.state.courseContains[i]}/>
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
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onMapSearch(e) {
    if (e) {
      e.preventDefault()
    }
    let BMap = window.BMap
    var map = new BMap.Map("allmap");            // 创建Map实例
    var point = new BMap.Point(120.102521, 30.26782); // 创建点坐标
    map.centerAndZoom(point,12);
    map.enableScrollWheelZoom();                 //启用滚轮放大缩小

    var myGeo = new BMap.Geocoder();
    // 将地址解析结果显示在地图上,并调整地图视野

    var geoc = new BMap.Geocoder();
    map.addEventListener("click", (e) => {
      var pt = e.point;
      map.clearOverlays();
      geoc.getLocation(pt, (rs) => {
        var addComp = rs.addressComponents;
        let lngLat = this.bd09_To_Gcj02(pt.lng, pt.lat)
        let lngGcj02 = lngLat['tempLon']
        let latGcj02 = lngLat['tempLat']
        this.setState({
          mapSearchCity_mapAuto: addComp.province + ", " + addComp.city,
          mapSearchAfterCity_mapAuto: addComp.district + ", " + addComp.street + ", " + addComp.streetNumber,
          mapHasAuto: true,
          lng: lngGcj02,
          lat: latGcj02
        })
        var point = new BMap.Point(e.point.lng,e.point.lat);
        map.centerAndZoom(point,16);
        var marker = new BMap.Marker(point);// 创建标注
        map.addOverlay(marker);             // 将标注添加到地图中
        marker.enableDragging();
        marker.addEventListener("dragend", (e) => {
          var pt = e.point;
          let lngLat = this.bd09_To_Gcj02(pt.lng, pt.lat)
          let lngGcj02 = lngLat['tempLon']
          let latGcj02 = lngLat['tempLat']
          geoc.getLocation(pt, (rs) => {
            var addComp = rs.addressComponents;
            this.setState({
              mapSearchCity_mapAuto: addComp.province + ", " + addComp.city,
              mapSearchAfterCity_mapAuto: addComp.district + ", " + addComp.street + ", " + addComp.streetNumber,
              mapHasAuto: true,
              lng: lngGcj02,
              lat: latGcj02
            })
          })
        })
      });
    })
    myGeo.getPoint(this.state.mapSearchCity + this.state.mapSearchAfterCity, (point) => {
      if (point) {
        map.centerAndZoom(point, 16);
        var marker =new BMap.Marker(point);
        map.addOverlay(marker);
        marker.enableDragging();
        console.log('search',point)
        let lngLat = this.bd09_To_Gcj02(point.lng, point.lat)
        let lngGcj02 = lngLat['tempLon']
        let latGcj02 = lngLat['tempLat']
        console.log('search',lngGcj02,latGcj02)
        geoc.getLocation(point, (rs) => {
          var addComp = rs.addressComponents;
          this.setState({
            mapSearchCity_mapAuto: addComp.province + ", " + addComp.city,
            mapSearchAfterCity_mapAuto: addComp.district + ", " + addComp.street + ", " + addComp.streetNumber,
            mapHasAuto: true,
            lng: lngGcj02,
            lat: latGcj02
          })
        })

        marker.addEventListener("dragend", (e) => {
            var pt = e.point;
          let lngLat = this.bd09_To_Gcj02(pt.lng, pt.lat)
          let lngGcj02 = lngLat['tempLon']
          let latGcj02 = lngLat['tempLat']
          geoc.getLocation(pt, (rs) => {
              var addComp = rs.addressComponents;
              this.setState({
                mapSearchCity_mapAuto: addComp.province + ", " + addComp.city,
                mapSearchAfterCity_mapAuto: addComp.district + ", " + addComp.street + ", " + addComp.streetNumber,
                mapHasAuto: true,
                lng: lngGcj02,
                lat: latGcj02
              })
            })
        })
      }else{
        alert("您选择地址没有解析到结果!");
      }
    }, this.state.mapSearchCity);
  }
  bd09_To_Gcj02(lon, lat) {
    let x = lon - 0.0065
    let  y = lat - 0.006
    let  x_pi = 3.14159265358979324 * 3000.0 / 180.0;
    let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
    let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
    let tempLon = z * Math.cos(theta);
    let tempLat = z * Math.sin(theta);
    let gps = {tempLat,tempLon};
    return gps;
  }

  auto_grow(element) {
    // let row = ((element.target.id === 'courseInfo'
    //   || element.target.id === 'courseContains'
    //   || element.target.id === 'otherInfo')
    //   ? 84 : 38)
    // element.target.style.height = 'auto';
    // element.target.style.height = (element.target.scrollHeight > row ? element.target.scrollHeight : row) + "px";
  }
  onImagesChange(e) {
    if (e.target.files) {
      for (let i = 0; i < e.target.files.length; i ++) {
        cos.uploadFile(e.target.files[i]).then(response => {
          this.setState({
            images: [...this.state.images, 'http://' + response.Location]
          })
          console.log('upload', response)
        }).catch(console.error)
      }
    }
  }
  onSubmitAddCourse(e) {
    e.preventDefault()
    if (e.target.name === 'mapSearchSubmit') {
      return
    }
    let hasTag = true
    this.state.tagIds.forEach((id) => {
      if (id == '') {
        hasTag = false
      }
    })
    if (this.state.tagIds.length === 0 || hasTag == false) {
      alert('请至少选择一个二级品类。')
      return
    }

    let hasImage = true
    this.state.images.forEach((image) => {
      if (image == '') {
        hasImage = false
      }
    })
    if (this.state.images.length === 0 || hasImage == false) {
      alert('请至少添加一张图片。')
      return
    }

    if (this.state.mapSearchCity == '' || this.state.mapSearchAfterCity == '') {
      alert('请输入课程地址。')
      return
    }
    if (this.state.lng == null || this.state.lat == null) {
      alert('请点击地图的搜索按钮，或在地图上标注课程地址，以确认您输入的地址有效，并正确标注在地图上。')
      return
    }
    if (this.state.title.trim().length == 0
    || this.state.content.trim().length == 0
     || (this.state.note && this.state.note.trim().length == 0)) {
      alert('请勿在任何输入框内输入完全空的内容。')
      return
    }

    this.state.courseContains.forEach(courseContainsItem => {
      if (courseContainsItem && courseContainsItem.trim().length == 0) {
        alert('请勿在任何输入框内输入完全空的内容。')
        return
      }
    })

    if (this.state.edit) {
      this.props.editCourse(this.state.images,this.state.title, this.state.categoryIds,this.state.tagIds,this.state.place,this.state.duration,
        this.state.content,this.state.courseContains,this.state.mapSearchCity, this.state.lng, this.state.lat,
        this.state.note,this.state.price, this.state.mapSearchAfterCity, this.props.match.params.id).then(() => this.props.history.push('/courses/'))
      return
    }
    this.props.addCourse(this.state.images,this.state.title, this.state.categoryIds,this.state.tagIds,this.state.place,this.state.duration,
      this.state.content,this.state.courseContains,this.state.mapSearchCity, this.state.lng, this.state.lat,
      this.state.note,this.state.price, this.state.mapSearchAfterCity).then(() => this.props.history.push('/courses/'))
  }
  renderImages() {
    let imagesRenderList = []
    for (let i = 0; i < this.state.images.length; i ++) {
      imagesRenderList.push(
        <div key={i} className='mt-2 ml-0' >
        <img style={{width: '500px'}} src={this.state.images[i]}/>
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
      this.state.images.splice(index, 1);
    }
    this.setState({
      images: this.state.images
    }, () => console.log(1, this.state))
  }
  render() {
    if (!this.props.authenticated) {
      return <div></div>
    }
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
                         maxLength='20'
                         value={this.state.title}
                         required
                         autoFocus/>
                  <div className='d-flex align-items-center'>
                    <div style={{marginLeft: '5px'}}>最大字数20</div>
                  </div>
                </div>
              </div>

              <div className='form-group row'>
                <label className='form_label col-sm-2 col-form-label'>品类</label>
                <div className='col-sm-2 d-flex flex-column'>
                  {this.renderTagsSelectionList()}
                  <button onClick={this.addTagsSelection.bind(this)}
                          className="btn btn-outline-dark my-2 mx-0 my-sm-2"
                          type="button"
                          style={{borderColor: '#5a5a5a', color: '#5a5a5a', width: '150px'}}>添加品类
                  </button>
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
                  <input className="form-control"
                         value={this.state.place}
                         onChange={this.onValueChange.bind(this)}
                                                 name="place" required/></div>
              </div>

              <div className='form-group row'>
                <label className='form_label col-sm-2 col-form-label'>课程时长</label>
                <div className='col-sm-2 d-flex'><input className="form-control col-sm-10" name='duration' type="number" value={this.state.duration}
                                                        step="any" onChange={this.onValueChange.bind(this)}/>
                  <div className='d-flex align-items-center'>
                    <div style={{marginLeft: '5px'}}>小时</div>
                  </div>
                </div>
              </div>

              <div className='form-group row'>
                <label className='form_label col-sm-2 col-form-label'>课程单价</label>
                <div className='col-sm-2 d-flex'>
                  <input className="form-control  col-sm-10" name='price' type="number"
                         value={this.state.price}
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
                            value={this.state.content}
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
                <div className='col-sm-5'>
                  <form name='mapSearchSubmit' onSubmit={this.onMapSearch.bind(this)}>
                    <input className="form-control wrap" value={this.state.mapSearchCity}
                           onChange={this.onValueChange.bind(this)}
                           name='mapSearchCity'
                           onKeyUp={this.auto_grow.bind(this)}
                           placeholder='请输入省份 + 城市名'
                           value={this.state.mapSearchCity}
                           required
                    />
                    <input className="form-control wrap mt-2" value={this.state.mapSearchAfterCity}
                           onChange={this.onValueChange.bind(this)}
                           name='mapSearchAfterCity'
                           onKeyUp={this.auto_grow.bind(this)}
                           placeholder='请输入详细地址，不用包含省市名'
                           value={this.state.mapSearchAfterCity}
                           required/>
                    <div className='d-flex flex-column'>
                      {this.state.mapHasAuto &&
                      <div style={{textAlign: 'left'}}>{'提醒：地图搜索得出的地址信息为：\"' +
                      this.state.mapSearchCity_mapAuto + '-' + this.state.mapSearchAfterCity_mapAuto
                      + '\"， 请确认您输入的地址。如无误，请继续。'}</div>
                      }
                      <button type='submit' className="btn btn-outline-dark my-2 mx-0 my-sm-2"
                              style={{borderColor: '#5a5a5a', color: '#5a5a5a', width: '150px'}}>搜索该地址
                      </button>
                    </div>
                  </form>
                  <div id="allmap" style={{height: '400px'}}>
                  </div>
                </div>
              </div>

              <div className='form-group row'>
                <label className='form_label col-sm-2 col-form-label'>备注</label>
                <div className='col-sm-5'>
                  <textarea className="form-control" id='otherInfo' name='note' value={this.state.note}
                            onChange={this.onValueChange.bind(this)}/>
                </div>
              </div>

              <div className='form-group row'>
                <label className='form_label col-sm-2 col-form-label'> </label>
                <div className='col-sm-5'>
                  <button className="btn btn-outline-success my-2 mx-4 my-sm-0" style={{width: '100px'}} type='submit'
                          name='formSubmit'>Submit
                  </button>
                  <button className="btn btn-outline-success my-2 mx-4 my-sm-0" style={{width: '100px'}}
                          onClick={() => this.props.history.push('/courses')}>Cancel
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


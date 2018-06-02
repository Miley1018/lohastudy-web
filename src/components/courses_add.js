import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createCourse} from '../actions/courses';
import Footer from './footer'
import Header from './header'

class Courses_add extends Component {
  constructor(props) {
    super(props)
    this.state = {
      courseContains: [""],
      mapSearchCity: '',
    mapSearchAfterCity:''
    }
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

    map.addEventListener("click", function(e) {
      var pt = e.point;
      console.log(e)
      geoc.getLocation(pt, function (rs) {
        var addComp = rs.addressComponents;
        alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
      });
    })
  }

  addCourseContains(e) {
    e.preventDefault()
    this.setState({
      courseContains: [...this.state.courseContains, '']
    })
  }
  onCourseContainsChange(e) {
    let newContains = this.state.courseContains
    newContains[Number(e.target.name) - 1] = e.target.value
    this.setState({
      courseContains: newContains
    })
  }
  onMapValueChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onMapSearch(e) {
    e.preventDefault()
    let BMap = window.BMap
    var map = new BMap.Map("allmap");            // 创建Map实例
    var point = new BMap.Point(120.102521, 30.26782); // 创建点坐标
    map.centerAndZoom(point,12);
    map.enableScrollWheelZoom();                 //启用滚轮放大缩小

    var myGeo = new BMap.Geocoder();
    // 将地址解析结果显示在地图上,并调整地图视野

    var geoc = new BMap.Geocoder();

    map.addEventListener("click", function(e) {
      var pt = e.point;
      console.log('1111')
      geoc.getLocation(pt, function (rs) {
        var addComp = rs.addressComponents;
        alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
      });
    })

    myGeo.getPoint(this.state.mapSearchCity + this.state.mapSearchAfterCity, function(point){
      if (point) {
        map.centerAndZoom(point, 16);
        var marker =new BMap.Marker(point);
        map.addOverlay(marker);
        marker.enableDragging();
        marker.addEventListener("dragend", function(e){
          alert("当前位置：" + e.point.lng + ", " + e.point.lat);
        })
      }else{
        alert("您选择地址没有解析到结果!");
      }
    }, this.state.mapSearchCity);
  }
  renderCourseContainsList() {
    let courseContainsList = []
    for (let i = 1; i < this.state.courseContains.length; i ++) {
      courseContainsList.push(
        <div className='d-flex' key={i}>
          <div className='col-sm-1'>{i + 1}、</div>
          <textarea className="form-control mt-2" name={i + 1} onChange={this.onCourseContainsChange.bind(this)}
            value={this.state.courseContains[i]}/>
        </div>
      )
    }
    return courseContainsList
  }
  auto_grow(element) {
    let row = ((element.target.id === 'courseInfo'
      || element.target.id === 'courseContains'
      || element.target.id === 'other')
      ? 84 : 38)
    element.target.style.height = 'auto';
    element.target.style.height = (element.target.scrollHeight > row ? element.target.scrollHeight : row) + "px";
  }
  render() {
    return (
      <div className='pageWrap'>
        <Header/>
        <div className='flexGrow'>
          <h3 style={{textAlign: 'left', margin: '15px 25px'}}>新增课程</h3>
          <hr className="style-two"/>
          <div className='mainBody'>
            <form className='mainBody_form'>
              <div className='form-group row'>
                <label className='form_label col-sm-2 col-form-label'>名称</label>
                <div className='col-sm-5 d-flex'>
                  <input className="form-control col-sm-10" autoFocus/>
                  <div className='d-flex align-items-center'>
                    <div style={{marginLeft: '5px'}}>最大字数20</div>
                  </div>
                </div>
              </div>

              <div className='form-group row'>
                <label className='form_label col-sm-2 col-form-label'>品类</label>
                <div className='col-sm-2'>
                  <select id="inputState" className="form-control" defaultValue='文化历史' style={{textAlignLast:'center'}}>
                    <option>文化历史</option>
                    <option>舞蹈形体</option>
                    <option>健康养生</option>
                    <option>旅游户外</option>
                    <option>美食美物</option>
                  </select>
                </div>
              </div>

              <div className='form-group row'>
                <label className='form_label col-sm-2 col-form-label'>商圈</label>
                <div className='col-sm-5'><input className="form-control"/></div>
              </div>

              <div className='form-group row'>
                <label className='form_label col-sm-2 col-form-label'>课程时长</label>
                <div className='col-sm-3 d-flex'><input className="form-control  col-sm-10"/>
                  <div className='d-flex align-items-center'>
                    <div style={{marginLeft: '5px'}}>小时</div>
                  </div>
                </div>
              </div>

              <div className='form-group row'>
                <label className='form_label col-sm-2 col-form-label'>课程单价</label>
                <div className='col-sm-3 d-flex'><input className="form-control  col-sm-10"/>
                  <div className='d-flex align-items-center'>
                    <div style={{marginLeft: '5px'}}>元</div>
                  </div>
                </div>
              </div>

              <div className='form-group row'>
                <label className='form_label col-sm-2 col-form-label'>课程内容</label>
                <div className='col-sm-5'>
                  <textarea className="form-control" id='courseInfo'/>
                </div>
              </div>

              <div className='form-group row'>
                <label className='form_label col-sm-2 col-form-label'>课程內包含</label>
                <div className='col-sm-5'>
                  <div className='d-flex'><div className='col-sm-1'>1、</div>
                    <textarea className="form-control" name='1' id='courseContains' onChange={this.onCourseContainsChange.bind(this)}/></div>
                  {this.renderCourseContainsList()}
                  <div className='d-flex'>
                    <button onClick={this.addCourseContains.bind(this)} className="btn btn-outline-dark my-2 mx-4 my-sm-0 margin_l_0" style={{borderColor: '#5a5a5a', color:'#5a5a5a', width:'150px'}}>添加更多
                  </button></div>
                </div>
              </div>

              <div className='form-group row'>
                <label className='form_label col-sm-2 col-form-label'>课程地点</label>
                <div className='col-sm-5'>
                  <form onSubmit={this.onMapSearch.bind(this)}>
                  <input className="form-control wrap" value={this.state.mapSearchCity}
                         onChange={this.onMapValueChange.bind(this)}
                         name='mapSearchCity'
                         onKeyUp={this.auto_grow.bind(this)}
                         placeholder='请输入城市名'
                         required
                  />
                  <input className="form-control wrap" value={this.state.mapSearchAfterCity}
                         onChange={this.onMapValueChange.bind(this)}
                         name='mapSearchAfterCity'
                         onKeyUp={this.auto_grow.bind(this)}
                         placeholder='请输入详细地址，不用包含城市名'
                         required/>
                  <button type='submit'>搜索该地址</button>
                  </form>
                  <div id="allmap" style={{height:'400px'}}>
                  </div>
                </div>
              </div>

              <div className='form-group row'>
                <label className='form_label col-sm-2 col-form-label'>备注</label>
                <div className='col-sm-5'><input className="form-control" id="other"/></div>
              </div>
            </form>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}
export default connect(null,{createCourse})(Courses_add)


import React from 'react'
import './tcMap.css'

class TcMap extends React.Component {
  constructor(props) {
    super(props)
    this.onSearch = this.onSearch.bind(this)
    this.inputChange = this.inputChange.bind(this)
    this.state = {
      region: '',
      keyword: '',
      poiList: []
    }
    this.onPoiClick = this.onPoiClick.bind(this)
  }
  componentDidMount() {
    const tcMap = new qq.maps.Map(document.getElementById("tcMap"), {
      // 地图的中心地理坐标。
      center: new qq.maps.LatLng(39.916527, 116.397128)
    })
    const that = this
    var infoWin = new qq.maps.InfoWindow({
      map: tcMap
    });
    this.infoWin = infoWin
    const searchService = new qq.maps.SearchService({
      //检索成功的回调函数
      complete: function(results) {
        //设置回调函数参数
        var pois = results.detail.pois;
        that.setState({
          poiList: pois
        })
        var latlngBounds = new qq.maps.LatLngBounds();
        for (var i = 0, l = pois.length; i < l; i++) {
          var poi = pois[i];
          //扩展边界范围，用来包含搜索到的Poi点
          latlngBounds.extend(poi.latLng);

          (function(n) {
            var marker = new qq.maps.Marker({
              map: tcMap
            });
            marker.setPosition(pois[n].latLng);

            marker.setTitle(i + 1);
            // markers.push(marker);


            qq.maps.event.addListener(marker, 'click', function() {
              that.onPoiClick(pois[n])
            });
          })(i);
        }
        //调整地图视野
        tcMap.fitBounds(latlngBounds);
      },
      //若服务请求失败，则运行以下函数
      error: function() {
        alert("出错了。");
      }
    });
    this.searchService = searchService
  }
  inputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onSearch(){
    var pageIndex = 0
    var pageCapacity = 15
    // clearOverlays(markers);
    //根据输入的城市设置搜索范围
    this.searchService.setLocation(this.state.region);
    //设置搜索页码
    this.searchService.setPageIndex(pageIndex);
    //设置每页的结果数
    this.searchService.setPageCapacity(pageCapacity);
    //根据输入的关键字在搜索范围内检索
    this.searchService.search(this.state.keyword);
  }
  onPoiClick(poi) {
    this.infoWin.open();
    this.infoWin.setContent(`<div style="width:280px;height:100px;">${poi.name}, 地址: ${poi.address}</div>`);
    this.infoWin.setPosition(poi.latLng);
    this.props.onPoiClick && this.props.onPoiClick(poi)
  }

  render() {
    return <div>
      <input name="region" value={this.state.region} onChange={this.inputChange} placeholder="省市"/>
      <input name="keyword" value={this.state.keyword} onChange={this.inputChange} placeholder="关键词" />
      <button type="button" onClick={this.onSearch}>搜索</button>
      <div className="tcMap-container">
        <div className="tcMap-poi-list">
          <ul>
          {
            this.state.poiList.map(poi=>(
              <li key={poi.name} onClick={()=>this.onPoiClick(poi)}>{poi.name} / {poi.address}</li>
            ))
          }
          </ul>
        </div>
        <div id="tcMap" className="tcMap-map"></div>
      </div>
    </div>
  }
}

export default TcMap
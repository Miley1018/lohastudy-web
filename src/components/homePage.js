import React from 'react'
import Footer from './footer'
import Header from './header'

class HomePage extends React.Component{
  render() {
    return (
      <div className='pageWrap'>
        <Header/>
        <div className='flexGrow'>
          <div id="myCarousel" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
              <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
              <li data-target="#myCarousel" data-slide-to="1"></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active themeBgColor">
                <div className="container">
                  <div className="carousel-caption">
                    <h1>Welcome</h1>
                    <br/>
                    <p>Hey you, welcome！</p>
                    <p>We put forth every effort to create a great experience for our users.</p>
                    <br/>
                    <br/>
                  </div>
                </div>
              </div>
              <div className="carousel-item themeBgColor">
                <div className="container">
                  <div className="carousel-caption">
                    <h1>Have a good day！</h1>
                    <br/>
                    <p>Users will base their decisions on the work in your job.</p>
                    <p>Build your career at Lohastudy.</p>
                    <br/>
                    <br/>
                  </div>
                </div>
              </div>
            </div>
            <a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>

            </a>
            <a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
        <div className="container marketing">
          <a name="management">
            <div className="row">
              <div className="col-lg-3">
                <div width="140" height="140" className='fontIcon'><i className="fa fa-jpy" aria-hidden="true"></i></div>
                <h2>订单管理</h2>
                <p><a className="btn themeButton" style={{color: 'floralwhite'}} onClick={() => {
                  this.props.history.push("/orders")
                }} role="button">查看详情&raquo;</a>
                </p>
              </div>
              <div className="col-lg-6">
                <div width="140" height="140" className='fontIcon'><i className="fa fa-list-alt"
                                                                      aria-hidden="true"></i></div>
                <h2>教务管理</h2>
                <p><a className="btn themeButton" style={{color: 'floralwhite'}} onClick={() => {
                  this.props.history.push("/categories")
                }} role="button">管理一级品类 &raquo;</a>
                  <a className="btn themeButton ml-2" style={{color: 'floralwhite'}} onClick={() => {
                    this.props.history.push("/tags")
                  }} role="button">管理二级品类&raquo;</a>
                  <a className="btn themeButton ml-2" style={{color: 'floralwhite'}} onClick={() => {
                    this.props.history.push("/courses")
                  }} role="button">管理课程&raquo;</a>
                </p>
              </div>
              <div className="col-lg-3">
                <div width="140" height="140" className='fontIcon'><i className="fa fa-id-badge"
                                                                      aria-hidden="true"></i></div>
                <h2>用户管理</h2>
                <p><a className="btn themeButton" style={{color: 'floralwhite'}} onClick={() => {
                  this.props.history.push("/users")
                }} role="button">查看详情&raquo;</a>
                </p>
              </div>
            </div>
          </a>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default HomePage

import React from 'react'
import {connect} from 'react-redux'
import {signout} from '../actions/auth'

class Header extends React.Component{
    handleSignin() {
        if (this.props.authenticated) {
            this.props.signout()
            location.href = '/'
        } else {
            location.href = '/signin'
        }
    }
    onSearch() {
        alert('Waiting for backend developer~')
    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top">
                    <a className="navbar-brand" href="/">Loha Study CMS</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav mr-auto">

                          <li className="nav-item active ml-2">
                            <a className="nav-link" href="/orders"> 订单管理 </a>
                          </li>

                          <li className="nav-item dropdown active ml-2">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              教务管理
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                              <a className="dropdown-item" href="/categories">一级品类管理</a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/tags">二级品类管理</a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="/courses">课程管理</a>
                            </div>
                          </li>

                          <li className="nav-item active ml-2">
                            <a className="nav-link" href="/users">用户管理</a>
                          </li>
                          <li className="nav-item active ml-2">
                            <a className="nav-link" href="/appconfig">Banner管理</a>
                          </li>

                        </ul>

                        <button className="btn btn-outline-success my-2 mx-4 my-sm-0" style={{width: '100px'}} type="submit" onClick={this.handleSignin.bind(this)}>{this.props.authenticated ? '退出': '登录'}
                        </button>
                    </div>
                </nav>
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        authenticated:state.auth.authenticated
    }
}
export default connect(mapStateToProps, {signout})(Header)



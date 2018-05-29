import React from 'react'
import md5 from 'md5'
import Footer from './footer'
import Header from './header'
import {signin, authError} from '../actions/auth'

import {connect} from 'react-redux';

class Signin extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email: '' ,
            password: '',
            checked: false
        }
        this.onChange = this.onChange.bind(this)
        this.onChecked = this.onChecked.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    componentWillMount(){
        let emailValue = localStorage.getItem('email')
        if (emailValue) {
            this.setState({
                email: emailValue,
                checked: true
            })
        }
    }
    onChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            }
        )
    }

    onChecked(e){
        let emailValue = localStorage.getItem('email')
        this.setState(
            {checked: e.target.checked}, ()=>{
                if (!this.state.checked && emailValue) {
                    localStorage.removeItem('email')
                }
            }
        )
    }

    onSubmit(e){
        e.preventDefault();
        if (this.state.checked) {
            localStorage.setItem('email',this.state.email)
        }
        const email = this.state.email.toLowerCase()
        const password = this.state.password
        this.props.signin(email, password)
    }

    showError() {
        if (this.props.authErrorMessage) {
            alert(this.props.authErrorMessage)
            this.props.authError('')
        }
    }

    render() {
        return (
            <div className='pageWrap'>
                <Header/>
                <div className='signinComponent flexGrow'>
                    <form className="form-signin" onSubmit={this.onSubmit}>
                        <h1 className="h3 mb-3 font-weight-normal">请登录</h1>
                        <label htmlFor="inputEmail" className="sr-only">用户名／电子邮箱</label>
                        <input type="email" name='email' id="inputEmail" className="form-control" placeholder="Email address" maxLength="255" style={{textTransform: "lowercase"}}
                               value={this.state.email} onChange={this.onChange} required autoFocus/>
                        <label htmlFor="inputPassword" className="sr-only">密码</label>
                        <input type="password" name='password' id="inputPassword" className="form-control" placeholder="Password" maxLength="50"
                               value={this.state.password} onChange={this.onChange} required/>
                        <div className="checkbox mb-3">
                            <label>
                                <input type="checkbox" value="remember-me" onChange={this.onChecked} checked={this.state.checked}/> 记住该账号
                            </label>
                        </div>
                        <button className="btn btn-lg btn-primary btn-block" type="submit">登录</button>
                    </form>
                </div>
                {this.showError()}
                <Footer/>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {authErrorMessage: state.auth.signinerror}
}

export default connect(mapStateToProps, {signin, authError})(Signin)

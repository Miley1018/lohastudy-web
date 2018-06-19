import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchDefaultAppConfig, editAppConfig} from "../../actions/appconfig";
import ImageUploader from '../ImageUploader'
import Header from '../header'
import Footer from '../footer'
class AppConfig extends Component {
  constructor(props) {
    super(props)
    this.onImageChange = this.onImageChange.bind(this)
    this.onUrlChange = this.onUrlChange.bind(this)
    this.onSave = this.onSave.bind(this)
    this.state = this.getStateFromProps(props)
  }
  getStateFromProps(props) {
    return {
      appConfig: props.defaultConfig
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultConfig !== this.props.appConfig) {
      this.setState(this.getStateFromProps(nextProps))
    }
  }
  componentWillMount() {
    this.props.fetchDefaultAppConfig()
  }
  onImageChange(newImage) {
    this.setState({appConfig: {
      ...this.state.appConfig,
      banner: newImage,
    }})
  }
  onUrlChange(e) {
    this.setState({appConfig: {
        ...this.state.appConfig,
        redirectUrl: e.target.value,
      }})
  }
  onSave() {
    if (!this.state.appConfig.id) {
      console.error('no appconfig id')
    }
    this.props.editAppConfig(this.state.appConfig, this.state.appConfig.id).then(()=>{
      this.props.history.push('/')
    })
  }
  render() {
    const appConfig = this.state.appConfig
    return <div className='pageWrap'>
        <Header/>
      <div>
        <div>
          Banner:
          <ImageUploader image={appConfig.banner} onImageChange={this.onImageChange}/>
        </div>
        <div>
          跳转链接: <input value={appConfig.redirectUrl} onChange={this.onUrlChange}/>
          <button onClick={this.onSave}>保存</button>
        </div>
      </div>
      <Footer/>
    </div>
  }
}

function mapStateToProps(state) {
  return {
    defaultConfig: state.appConfig.default,
  }
}

export default connect(mapStateToProps, {fetchDefaultAppConfig, editAppConfig})(AppConfig)

import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import cos from './utils/cos'

class App extends Component {
  onFileChange = (e)=>{
    if (e.target.files && e.target.files[0]) {
      cos.uploadFile(e.target.files[0]).then(console.log).catch(console.error)
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <img src="https://test-1256370191.cos.ap-guangzhou.myqcloud.com/bd_logo1.png" alt="baidu logo" />
        <input type="file" onChange={this.onFileChange}/>
      </div>
    );
  }
}

export default App;

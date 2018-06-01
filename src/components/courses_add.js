import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createCourse} from '../actions/courses';

class Courses_add extends Component{
  render() {
    return(
      <div>
        <div>新增课程</div>
        <form>
          <label>名称</label>
          <input />
        </form>
      </div>
    )
  }
}

export default connect(null,{createCourse})(Courses_add)


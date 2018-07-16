import React from 'react'
import {connect} from 'react-redux'
import ReactTable from "react-table";
import "react-table/react-table.css";

import Footer from '../footer'
import Header from '../header'
import CategoryList from '../common/CategoryList'
import TagList from '../common/TagList'

import makeCoursesItems from './makeCoursesItems.js'
import {fetchCourses, editCourse} from '../../actions/courses'

class CoursesContainer extends React.Component {
  constructor(props) {
    super(props)
    this.searchInputsChanged = this.searchInputsChanged.bind(this)
    this.search = this.search.bind(this)
    this.changeOnlineState = this.changeOnlineState.bind(this)
    this.state = {
      tableData: [],
      search: {
        title: "",
        categories: "",
        tags: "",
        onlineState: "online",
      }
    }
  }
  componentWillMount() {
    if (!this.props.authenticated) {
      this.props.history.push('/signin')
      return
    }
    this.fetchCourses()
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      tableData: makeCoursesItems(nextProps.courses)
    })
  }
  searchInputsChanged(e) {
    this.setSearchField(e.target.name, e.target.value)
  }
  setSearchField(key, value) {
    const searchState = this.state.search
    searchState[key] = value
    this.setState({search: searchState})
  }
  search() {
    this.fetchCourses()
  }
  fetchCourses() {
    this.props.fetchCourses(this.state.search)
  }
  changeOnlineState(id, isOnline) {
    const course = this.props.courses[id]
    if (isOnline) {
      let isDateValid = true
      const now = new Date()
      if (course.onlineStartDate && new Date(course.onlineStartDate) < now) {
        isDateValid = false
      }
      if (course.onlineEndDate && new Date(course.onlineEndDate) >= now) {
        isDateValid = false
      }
      const confirmText = isDateValid ? `是否确认上线课程：${course.title}` : '当前日期不在有效期内，是否继续上线？'
      if (confirm(confirmText)) {
        this.props.editCourse({'isManualOffline': false}, course.id).then(() => this.fetchCourses())
      }
    }
     else {
      const confirmValue = confirm(`是否确认下线课程: ${course.title}?`)
      if (confirmValue) {
        this.props.editCourse({'isManualOffline': true}, course.id).then(() => this.fetchCourses())
      }
    }
  }
  addNew() {
    this.props.history.push('/courses/add')
  }
  render() {
    if (!this.props.authenticated) {
      return <div></div>
    }

    const columns = [
      {   Header: "ID",
        accessor: "id",
        className: 'columnCell tenPer',
        headerClassName: 'columnCell tenPer'
      },
      {   Header: "名称",
        accessor: "name",
        className: 'columnCell twentyPer',
        headerClassName: 'columnCell twentyPer'
      },
      {   Header: "品类",
        accessor: "belong",
        className: 'columnCell twentyPer',
        headerClassName: 'columnCell twentyPer'
      },
      {   Header: "头图",
        accessor: "pic",
        className: 'columnCell thirtyPer',
        headerClassName: 'columnCell thirtyPer',
        Cell: row => (
          <img alt='course_pic' height={200} src={row.row.pic}/>
        )
      },
      {
        Header: "在线状态",
        accessor: "isOnline",
        className: 'columnCell tenPer',
        headerClassName: 'columnCell tenPer',
        Cell: row => (
          <span>{row.row.isOnline ? '已上线' : '已下线'}</span>
        )
      },
      {   Header: "操作",
        accessor: "operation",
        className: 'columnCell tenPer',
        headerClassName: 'columnCell tenPer',
        Cell: row => {
          return (<div>
            <button className='btn btn-outline-success my-2 mx-2 my-sm-0' onClick={(() => {this.props.history.push('/courses/add/' + row.original.id)}).bind(this)}>编辑</button>
            <button className='btn btn-outline-success my-2 mx-2 my-sm-0'
                    onClick={() => this.changeOnlineState(row.row.id, !row.row.isOnline)} >
              {row.row.isOnline ? '下线' : '上线'}</button>
          </div>)
        }
      }
    ]
    let height = screen.height * 0.77 + 'px'
    const searchState = this.state.search
    return (
      <div className='pageWrap' >
        <Header />
        <div className='flexGrow'>
          <h3 style={{textAlign: 'left', margin: '15px 25px'}}>课程管理</h3>
          <hr className="style-two" />
          <div className='d-flex flex-row'>
            <div className='d-flex' style={{marginLeft:'25px', marginBottom:'30px', marginRight: '25px'}}>
              <button onClick={this.addNew.bind(this)} className='btn themeButton'>&nbsp; &nbsp;&nbsp;+ 新增&nbsp;&nbsp;&nbsp;&nbsp; </button>
            </div>
            <div className="text-left flexGrow">
              <div>组合搜索：</div>
              名称：<input value={searchState.title} name="title" onChange={this.searchInputsChanged}/>
              一级品类：<CategoryList value={searchState.categories} onChange={(v)=>{this.setSearchField('categories', v);this.setSearchField('tags', '')}}/>
              二级品类：<TagList category={searchState.categories} value={searchState.tags} onChange={(v)=>this.setSearchField('tags', v)}/>
              在线状态：
              <select value={searchState.onlineState} name="onlineState" onChange={this.searchInputsChanged}>
                <option value="online">在线</option>
                <option value="offline">下线</option>
              </select>
              <button type="button" className="btn btn-primary" onClick={this.search}>搜索</button>

            </div>
          </div>
          <ReactTable
            data={this.state.tableData}
            columns={columns}
            defaultPageSize={15}
            pageSizeOptions={[5,15,50,100,500]}
            className="-highlight defaultMargin"
            style={{
              height: height,
              margin:'15px 15px',
              border:'hidden'
            }}
          />
        </div>
        <Footer />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    courses: state.courses.courses,
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps, {fetchCourses, editCourse})(CoursesContainer)

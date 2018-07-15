import React from 'react'
import {connect} from 'react-redux'
import ReactTable from "react-table";
import "react-table/react-table.css";

import Footer from '../footer'
import Header from '../header'
import CategoryList from '../common/CategoryList'
import TagList from '../common/TagList'

import makeCoursesItems from './makeCoursesItems.js'
import {fetchCourses, deleteCourse} from '../../actions/courses'

class CoursesContainer extends React.Component {
  constructor(props) {
    super(props)
    this.searchInputsChanged = this.searchInputsChanged.bind(this)
    this.search = this.search.bind(this)
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
    this.props.fetchCourses()
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
    console.log(searchState)
    this.setState({search: searchState})
  }
  search() {
    this.props.fetchCourses(this.state.search)
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
          <img alt='course_pic' src={row.row.pic}/>
        )
      },
      {   Header: "操作",
        accessor: "operation",
        className: 'columnCell twentyPer',
        headerClassName: 'columnCell twentyPer',
        Cell: row => {
          return (<div>
            <button className='btn btn-outline-success my-2 mx-2 my-sm-0' onClick={(() => {this.props.history.push('/courses/add/' + row.original.id)}).bind(this)}>编辑</button>
            <button className='btn btn-outline-success my-2 mx-2 my-sm-0'
                    onClick={() => {
                      const confirmValue = confirm('确认删除该课程？* 课程id：' + row.original.id)
                      if (confirmValue) {
                        this.props.deleteCourse(row.original.id).then(() => this.props.fetchCourses())
                      }
                     }} >
              删除</button>
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
          <div className='d-flex ' style={{marginLeft:'25px', marginBottom:'30px'}}><button onClick={this.addNew.bind(this)} className='btn themeButton'>&nbsp; &nbsp;&nbsp;+ 新增&nbsp;&nbsp;&nbsp;&nbsp; </button></div>
          <div className="text-left">
            <div>组合搜索：</div>
            <div>名称：<input value={searchState.title} name="title" onChange={this.searchInputsChanged}/></div>
            <div>
              一级品类：<CategoryList value={searchState.categories} onChange={(v)=>{this.setSearchField('categories', v);this.setSearchField('tags', '')}}/>
              二级品类：<TagList category={searchState.categories} value={searchState.tags} onChange={(v)=>this.setSearchField('tags', v)}/></div>
            <div>在线状态：<select value={searchState.onlineState} name="onlineState" onChange={this.searchInputsChanged}>
              <option value="online">在线</option>
              <option value="offline">下线</option>
            </select></div>
            <div><button type="button" onClick={this.search}>搜索</button></div>

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

export default connect(mapStateToProps, {fetchCourses, deleteCourse})(CoursesContainer)

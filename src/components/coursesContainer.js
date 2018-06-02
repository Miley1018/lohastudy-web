import React from 'react'
import {connect} from 'react-redux'
import ReactTable from "react-table";
import "react-table/react-table.css";

import Footer from './footer'
import Header from './header'

import makeCoursesItems from './makeCoursesItems.js'
import {fetchCourses} from '../actions/courses'

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
        <button className='btn btn-outline-success my-2 mx-2 my-sm-0'>编辑</button>
        <button className='btn btn-outline-success my-2 mx-2 my-sm-0'>删除</button>
      </div>)
    }
  }
]

class CoursesContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tableData: []
    }
  }
  componentWillMount() {
    if (!this.props.authenticated) {
      this.props.history.push('/signin')
      return
    }
    this.props.fetchCourses().then(()=>{
      console.log(this.props.courses)
      this.setState({
        tableData: makeCoursesItems(this.props.courses)
      })
    })
  }
  addNew() {
    this.props.history.push('/courses/add')
  }
  render() {
    console.log(this.props.courses)
    if (!this.props.authenticated) {
      return <div></div>
    }
    let height = screen.height * 0.77 + 'px'
    return (
      <div className='pageWrap' >
        <Header />
        <div className='flexGrow'>
          <h3 style={{textAlign: 'left', margin: '15px 25px'}}>课程管理</h3>
          <hr className="style-two" />
          <div className='d-flex ' style={{marginLeft:'25px', marginBottom:'30px'}}><button onClick={this.addNew.bind(this)} className='btn themeButton'>&nbsp; &nbsp;&nbsp;+ 新增&nbsp;&nbsp;&nbsp;&nbsp; </button></div>
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

export default connect(mapStateToProps, {fetchCourses})(CoursesContainer)

import React from 'react'
import {connect} from 'react-redux'
import ReactTable from "react-table";
import "react-table/react-table.css";

import Footer from './footer'
import Header from './header'

import makeProjectItems from './makeProjectItems.js'
import {fetchProjects} from '../actions/projects'

const columns = [
  {   Header: "Project Name",
    accessor: "projectName",
    className: 'bigColumn',
    headerClassName: 'bigColumn_header'
  },
  {   Header: "Past Days",
    accessor: "createTime",
    className: 'smallColumn',
    minWidth: 30,
    headerClassName: 'smallColumn_header'
  },
  {   Header: "Project Id",
    accessor: "id",
    className: 'smallColumn',
    minWidth: 30,
    headerClassName: 'smallColumn_header'
  }
]

class TagsContainer extends React.Component {
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
    this.props.fetchProjects().then(()=>{
      this.setState({
        tableData: makeProjectItems(this.props.projects)
      })
    })
  }
  render() {
    if (!this.props.authenticated) {
      return <div></div>
    }
    let height = screen.height * 0.77 + 'px'
    return (
      <div className='pageWrap'>
        <Header />
        <div className='flexGrow'>
          <ReactTable
            getTdProps={(state, rowInfo, column, instance) => {
              return {
                onClick: (e, handleOriginal) => {
                  if (rowInfo) {
                    this.props.history.push('/projectDetails/' + rowInfo.original.id)
                  }
                }}}}
            data={this.state.tableData}
            columns={columns}
            defaultPageSize={15}
            pageSizeOptions={[5,15,50,100,500]}
            className="-highlight defaultMargin"
            style={{
              height: height,
              margin:'15px 15px'
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
    projects: state.projects.toList(),
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps, {fetchProjects})(TagsContainer)

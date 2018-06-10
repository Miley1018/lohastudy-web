import React from 'react'
import {connect} from 'react-redux'
import ReactTable from "react-table";
import "react-table/react-table.css";

import Footer from './footer'
import Header from './header'

import makeUsersItems from './makeUsersItems.js'
import {fetchUsers} from '../actions/users'

class UsersContainer extends React.Component {
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
    this.props.fetchUsers()
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      tableData: makeUsersItems(nextProps.users)
    })
  }
  render() {
    if (!this.props.authenticated) {
      return <div></div>
    }
    const columns = [
      {   Header: "序号",
        accessor: "index",
        className: 'columnCell tenPer',
        headerClassName: 'columnCell tenPer'
      },
      {   Header: "ID",
        accessor: "id",
        className: 'columnCell tenPer',
        headerClassName: 'columnCell tenPer'
      },
      {   Header: "OPEN ID",
        accessor: "openId",
        className: 'columnCell tenPer',
        headerClassName: 'columnCell tenPer'
      },
      {   Header: "昵称",
        accessor: "nickname",
        className: 'columnCell tenPer',
        headerClassName: 'columnCell tenPer'
      },
      {   Header: "手机",
        accessor: "phoneNumber",
        className: 'columnCell fifPer',
        headerClassName: 'columnCell fifPer'
      },
      {   Header: "头像",
        accessor: "avatar",
        className: 'columnCell twentyPer',
        headerClassName: 'columnCell twentyPer',
        Cell: row => (
          <img alt='user_pic' src={row.row.avatar}/>
        )
      },
    ]
    let height = screen.height * 0.77 + 'px'
    return (
      <div className='pageWrap' >
        <Header />
        <div className='flexGrow'>
          <h3 style={{textAlign: 'left', margin: '15px 25px'}}>用户管理</h3>
          <hr className="style-two" />
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
    users: state.users.users,
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps, {fetchUsers})(UsersContainer)

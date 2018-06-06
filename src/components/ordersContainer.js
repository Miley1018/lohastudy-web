import React from 'react'
import {connect} from 'react-redux'
import ReactTable from "react-table";
import "react-table/react-table.css";

import Footer from './footer'
import Header from './header'

import {fetchOrders} from '../actions/orders.js'
import makeOrdersItems from "./makeOrdersItems";

class OrdersContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tableData: [],
      editOrder: false,
      thisOrderId: '',
      edit: false,
      title:'',
      status:'',
      nickname:'',
      phoneNumber:'',
      city:'',
      detail:'',
      lng:'',
      lat:'',
      courseDate: '',
      courseTime: ''
    }
  }
  componentWillMount() {
    if (!this.props.authenticated) {
      this.props.history.push('/signin')
      return
    }
    this.props.fetchOrders()
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      tableData: makeOrdersItems(nextProps.orders)
    })
  }
  onSelectStatusChange(e) {
    if (e.target.value == 'all') {
      this.setState({
        tableData: makeOrdersItems(this.props.orders)
      })
      return
    }
    const filteredOrders = {}
    for (let key in this.props.orders) {
      if (this.props.orders[key].status == e.target.value) {
        filteredOrders[key] = this.props.orders[key]
      }
    }
    this.setState({
      tableData: makeOrdersItems(filteredOrders)
    })
  }
  cancelEdit() {
    this.setState({
      editOrder: false,
      thisOrderId: '',
      edit: false,
      title:'',
      status:'',
      nickname:'',
      phoneNumber:'',
      city:'',
      detail:'',
      lng:'',
      lat:'',
      courseDate: '',
      courseTime: ''
    })
  }
  onSubmitEditOrder(e) {
    e.preventDefault()
  }
  render() {
    if (!this.props.authenticated) {
      return <div></div>
    }
    const columns = [
      {   Header: "订单ID",
        accessor: "id",
        className: 'columnCell tenPer',
        headerClassName: 'columnCell tenPer'
      },
      {   Header: "预约状态",
        accessor: "status",
        className: 'columnCell tenPer',
        headerClassName: 'columnCell tenPer'
      },
      {   Header: "预约日期",
        accessor: "courseDate",
        className: 'columnCell tenPer',
        headerClassName: 'columnCell tenPer'
      },
      {   Header: "预约时间",
        accessor: "courseTime",
        className: 'columnCell tenPer',
        headerClassName: 'columnCell tenPer'
      },
      {   Header: "用户联系方式",
        accessor: "phoneNumber",
        className: 'columnCell fifPer',
        headerClassName: 'columnCell fifPer'
      },
      {   Header: "用户昵称",
        accessor: "nickname",
        className: 'columnCell tenPer',
        headerClassName: 'columnCell tenPer'
      },
      {   Header: "课程名称",
        accessor: "title",
        className: 'columnCell fifPer',
        headerClassName: 'columnCell fifPer'
      },
      {   Header: "订单创建时间",
        accessor: "createdAt",
        className: 'columnCell tenPer',
        headerClassName: 'columnCell tenPer'
      },
      {   Header: "操作",
        accessor: "operation",
        className: 'columnCell tenPer',
        headerClassName: 'columnCell tenPer',
        Cell: row => {
          return (<div>
            <button className='btn btn-outline-success my-2 mx-2 my-sm-0' onClick={() => {
              this.setState({
                thisOrderId: row.original.id,
                editOrder: true,
                edit:true,
                title:this.props.orders[row.original.id].course.title,
                status:this.props.orders[row.original.id].status,
                nickname:this.props.orders[row.original.id].user.nickname,
                phoneNumber:this.props.orders[row.original.id].user.phoneNumber,
                city:this.props.orders[row.original.id].course.concreteAddress.city,
                detail:this.props.orders[row.original.id].course.concreteAddress.detail,
                lng:this.props.orders[row.original.id].course.location.coordinates[0],
                lat:this.props.orders[row.original.id].course.location.coordinates[1],
                courseDate: this.props.orders[row.original.id].courseDate,
                courseTime: this.props.orders[row.original.id].courseTime
              })
            }}>编辑/查看</button>
          </div>)
        }
      }
    ]

    let height = screen.height * 0.77 + 'px'
    return (
      <div className='pageWrap'>
        <Header />
        <div className='flexGrow'>
          {this.state.editOrder &&
          <div className='showModal' style={{position: 'relative'}}>
            <div className='componentOnShowModal col-sm-5'>
              <h3 style={{textAlign: 'left', margin: '15px 25px'}}>新增二级品类</h3>
              <hr className="style-two"/>
              <form name='formSubmit' className='mainBody_form' onSubmit={this.onSubmitEditOrder.bind(this)}>
                <div className='form-group row'>
                  <label className='form_label col-sm-3 col-form-label'>课程</label>
                  <div className='col-sm-8 d-flex'>
                    <input className="form-control col-sm-10"
                           name='title'
                           value={this.state.title}
                           disabled
                           />
                  </div>
                </div>

                <div className='form-group row'>
                  <label className='form_label col-sm-3 col-form-label'>预约状态</label>
                  <div className='col-sm-8 d-flex flex-column'>
                    <select className='form-control col-sm-8 mt-2' onChange={this.onEditStatusChange.bind(this)}>
                      <option value='all'>全部</option>
                      <option value='pending'>预约确认中</option>
                      <option value='confirmed'>预约成功</option>
                      <option value='cancelled'>预约已取消</option>
                    </select>
                  </div>
                </div>

                <div className='form-group row'>
                  <label className='form_label col-sm-3 col-form-label'>用户昵称</label>
                  <div className='col-sm-8 d-flex'>
                    <input className="form-control col-sm-10"
                           name='nickname'
                           value={this.state.nickname}
                           disabled
                    />
                  </div>
                </div>

                <div className='form-group row'>
                  <label className='form_label col-sm-3 col-form-label'>用户联系方式</label>
                  <div className='col-sm-8 d-flex'>
                    <input className="form-control col-sm-10"
                           name='phoneNumber'
                           value={this.state.phoneNumber}
                           disabled
                    />
                  </div>
                </div>

                <div className='form-group row'>
                  <label className='form_label col-sm-3 col-form-label'>上课地点</label>
                  <div className='col-sm-8 d-flex'>
                    <input className="form-control col-sm-10"
                           name='phoneNumber'
                           value={this.state.phoneNumber}
                           disabled
                    />
                  </div>
                </div>

                <div className='form-group row'>
                  <label className='form_label col-sm-2 col-form-label'> </label>
                  <div className='col-sm-5 d-flex'>
                    <button className="btn btn-outline-success my-2 mx-4 my-sm-0" style={{width: '100px'}} type='submit'
                            name='formSubmit'>&nbsp; &nbsp;提交&nbsp; &nbsp;
                    </button>
                    <button className="btn btn-outline-success my-2 mx-4 my-sm-0" style={{width: '100px'}} type='button'
                            onClick={this.cancelEdit.bind(this)}>&nbsp; &nbsp;取消&nbsp; &nbsp;
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          }

          <h3 style={{textAlign: 'left', margin: '15px 25px'}}>预约管理</h3>
          <hr className="style-two" />
          <div className='d-flex ' style={{marginLeft:'25px', marginBottom:'30px'}}>
            <div style={{textAlign:'left'}}>预约状态</div>
            <select className='ml-3' onChange={this.onSelectStatusChange.bind(this)}>
              <option value='all'>全部</option>
              <option value='pending'>预约确认中</option>
              <option value='confirmed'>预约成功</option>
              <option value='cancelled'>预约已取消</option>
            </select>
          </div>
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
    orders: state.orders.orders,
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps, {fetchOrders})(OrdersContainer)

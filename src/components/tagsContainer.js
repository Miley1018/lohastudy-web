import React from 'react'
import {connect} from 'react-redux'
import ReactTable from "react-table";
import "react-table/react-table.css";

import Footer from './footer'
import Header from './header'

import makeTagItems from './makeTagItems.js'
import {fetchTags, deleteTag, addTag, editTag} from '../actions/tags'
import {fetchCategories} from '../actions/categories'

class TagsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tableData: [],
      addTag: false,
      name:'',
      categoryId: '',
      edit: false,
      thisTagId: ''
    }
  }
  componentWillMount() {
    if (!this.props.authenticated) {
      this.props.history.push('/signin')
      return
    }
    this.props.fetchTags()
    this.props.fetchCategories().then(() => {
      if (!this.props.categories || this.props.categories.length == 0) {
        alert('请先添加一级品类')
        return
      }
      this.setState({
        categoryId: this.props.categories[Object.keys(this.props.categories)[0]].id
      })
    })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      tableData: makeTagItems(nextProps.tags, nextProps.categories)
    })

  }
  addNew() {
    this.setState({
      addTag: true,
      categoryId: this.props.categories[Object.keys(this.props.categories)[0]].id
    })
  }
  onSubmitAddTag(e) {
    e.preventDefault()

    if (this.state.name.trim().length == 0) {
      alert('请勿在任何输入框内输入完全空的内容。')
      return
    }

    if (this.state.edit) {
      this.props.editTag(this.state.name, this.state.categoryId, this.state.thisTagId).then(() =>
        this.props.fetchTags().then(
        this.setState({
          addTag: false,
          edit:false,
          thisTagId:'',
          name: '',
          categoryId: ''
        })))
      return
    }
    this.props.addTag(this.state.name, this.state.categoryId).then(() =>
      this.props.fetchTags().then(
      this.setState({
        addTag: false,
        edit:false,
        thisTagId:'',
        name: '',
        categoryId: ''
    })))
  }
  onValueChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  cancelAdd() {
    this.setState({
      addTag: false,
      edit:false,
      thisTagId:'',
      name: '',
      categoryId: ''
    })
  }
  onSelectChange(e) {
    let id = e.target.value
    this.setState({
      categoryId: id
    })
  }
  renderCategoriesSelection(selectedCategoryId) {
    let categoriesList = []
    if (this.props.categories && Object.keys(this.props.categories) && Object.keys(this.props.categories).length !== 0) {
      for (let key in this.props.categories) {
        categoriesList.push(
          <option key={key}
                  selected={selectedCategoryId == key ?  true: false}
                  value={this.props.categories[key].id}>
            {this.props.categories[key].name}
          </option>
        )
      }
    }
    return categoriesList
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
      {   Header: "二级品类名称",
        accessor: "name",
        className: 'columnCell twentyPer',
        headerClassName: 'columnCell twentyPer'
      },
      {   Header: "一级品类",
        accessor: "category",
        className: 'columnCell twentyPer',
        headerClassName: 'columnCell twentyPer'
      },
      {   Header: "操作",
        accessor: "operation",
        className: 'columnCell thirtyPer',
        headerClassName: 'columnCell thirtyPer',
        Cell: row => {
          return (<div>
            <button className='btn btn-outline-success my-2 mx-2 my-sm-0' onClick={() => {
                this.setState({
                  thisTagId: row.original.id,
                  addTag: true,
                  edit:true,
                  name:this.props.tags[row.original.id].name,
                  categoryId: this.props.tags[row.original.id].category
                })
            }}>编辑</button>
            <button className='btn btn-outline-success my-2 mx-2 my-sm-0'
                    onClick={() => {
                      const confirmValue = confirm('确认删除该二级品类？* 二级品类id：' + row.original.id)
                      if (confirmValue) {
                        this.props.deleteTag(row.original.id).then(() => this.props.fetchTags())
                      }
                    }} >
              删除</button>
          </div>)
        }
      }
    ]
    let height = screen.height * 0.77 + 'px'
    return (
      <div className='pageWrap' >
        <Header />
        <div className='flexGrow'>
          {this.state.addTag &&
          <div className='showModal'>
            <div className='componentOnShowModal col-sm-5'>
              <h3 style={{textAlign: 'left', margin: '15px 25px'}}>新增二级品类</h3>
              <hr className="style-two"/>
              <form name='formSubmit' className='mainBody_form' onSubmit={this.onSubmitAddTag.bind(this)}>
                <div className='form-group row'>
                  <label className='form_label col-sm-3 col-form-label'>名称</label>
                  <div className='col-sm-8 d-flex'>
                    <input className="form-control col-sm-10"
                           name='name'
                           onChange={this.onValueChange.bind(this)}
                           maxLength='20'
                           value={this.state.name}
                           required
                           autoFocus/>
                  </div>
                </div>

                <div className='form-group row'>
                  <label className='form_label col-sm-3 col-form-label'>一级品类</label>
                  <div className='col-sm-8 d-flex flex-column'>
                      <select id="tagsSelect" className="form-control col-sm-8 mt-2"
                              onChange={this.onSelectChange.bind(this)}
                              style={{textAlignLast: 'center'}}>
                        {this.renderCategoriesSelection(this.state.categoryId)}
                      </select>
                  </div>
                </div>

                <div className='form-group row'>
                  <label className='form_label col-sm-2 col-form-label'> </label>
                  <div className='col-sm-5 d-flex'>
                    <button className="btn btn-outline-success my-2 mx-4 my-sm-0" style={{width: '100px'}} type='submit'
                            name='formSubmit'>Submit
                    </button>
                    <button className="btn btn-outline-success my-2 mx-4 my-sm-0" style={{width: '100px'}} type='button'
                            onClick={this.cancelAdd.bind(this)}>Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          }
          <h3 style={{textAlign: 'left', margin: '15px 25px'}}>二级品类管理</h3>
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
    tags: state.tags.tags,
    categories: state.categories.categories,
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps, {fetchTags, deleteTag, fetchCategories, addTag, editTag})(TagsContainer)

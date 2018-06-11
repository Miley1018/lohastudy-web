import React from 'react'
import {connect} from 'react-redux'
import ReactTable from "react-table";
import "react-table/react-table.css";

import Footer from './footer'
import Header from './header'

import makeCategoryItems from './makeCategoryItems.js'
import {fetchCategories, deleteCategory, addCategory, editCategory} from '../actions/categories'
import cos from "../utils/upload";

class CategoriesContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tableData: [],
      addCategory: false,
      name:'',
      weight: null,
      image:'',
      edit: false,
      thisCategoryId: ''
    }
  }
  componentWillMount() {
    if (!this.props.authenticated) {
      this.props.history.push('/signin')
      return
    }
    this.props.fetchCategories()
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      tableData: makeCategoryItems(nextProps.categories)
    })
  }
  addNew() {
    this.setState({
      addCategory: true
    })
  }
  onSubmitAddCategory(e) {
    e.preventDefault()

    if (this.state.image == '') {
      alert('请添加一张图片。')
      return
    }

    if (this.state.name.trim().length == 0) {
      alert('请勿在任何输入框内输入完全空的内容。')
      return
    }

    if (this.state.edit) {
      this.props.editCategory(this.state.name, this.state.weight, this.state.image, this.state.thisCategoryId).then(() => {
        this.props.fetchCategories().then(
          this.setState({
            addCategory: false,
            edit: false,
            thisCategoryId: '',
            name: '',
            weight: null,
            image: ''
          }))
      })
      return
    }
    this.props.addCategory(this.state.name, this.state.weight, this.state.image).then(() => {
      this.props.fetchCategories().then(
        this.setState({
          addCategory: false,
          edit: false,
          thisCategoryId: '',
          name: '',
          weight: null,
          image: ''
        }))
    })
  }
  onValueChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onImagesChange(e) {
    if (e.target.files) {
      cos.uploadFile(e.target.files[0]).then(response => {
        this.setState({
          image: 'http://' + response.Location
        })
      }).catch(console.error)
    }
  }
  renderImage() {
    return (
      <div className='mt-2 ml-0'>
        <img style={{width: '300px',maxHeight:'300px'}} src={this.state.image} accept="image/*"/>
      </div>)
  }
  cancelAdd() {
    this.setState({
      addCategory: false,
      edit: false,
      thisCategoryId: '',
      name: '',
      weight: null,
      image: ''
    })
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
      {   Header: "权重",
        accessor: "weight",
        className: 'columnCell twentyPer',
        headerClassName: 'columnCell twentyPer'
      },
      {   Header: "头图",
        accessor: "image",
        className: 'columnCell thirtyPer',
        headerClassName: 'columnCell thirtyPer',
        Cell: row => (
          <img alt='catergory_pic' src={row.row.image}/>
        )
      },
      {   Header: "操作",
        accessor: "operation",
        className: 'columnCell twentyPer',
        headerClassName: 'columnCell twentyPer',
        Cell: row => {
          return (<div>
            <button className='btn btn-outline-success my-2 mx-2 my-sm-0' onClick={() => {
              this.setState({
                thisCategoryId: row.original.id,
                addCategory: true,
                edit:true,
                name:this.props.categories[row.original.id].name,
                weight: this.props.categories[row.original.id].order,
                image: this.props.categories[row.original.id].image
              })
            }}>编辑</button>
            <button className='btn btn-outline-success my-2 mx-2 my-sm-0'
                    onClick={() => {
                      const confirmValue = confirm('确认删除该一级品类？* 一级品类id：' + row.original.id)
                      if (confirmValue) {
                        this.props.deleteCategory(row.original.id).then(() => this.props.fetchCategories())
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
        <div className='flexGrow' style={{position: 'relative'}}>
          {this.state.addCategory &&
          <div className='showModal'>
            <div className='componentOnShowModal col-sm-5'>
              <h3 style={{textAlign: 'left', margin: '15px 25px'}}>新增一级品类</h3>
              <hr className="style-two"/>
              <form name='formSubmit' className='mainBody_form' onSubmit={this.onSubmitAddCategory.bind(this)}>
                <div className='form-group row'>
                  <label className='form_label col-sm-2 col-form-label'>名称</label>
                  <div className='col-sm-5 d-flex'>
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
                  <label className='form_label col-sm-2 col-form-label'>图片</label>
                  <div className='d-flex flex-column'>
                    <div className='d-flex'>
                      <div id="hide" className="col-sm-5 ml-0">
                        <label>{this.state.image ? '更换图片':'添加图片'}
                          <input type="file" id="file" name="file"
                                 accept=".jpg, .jpeg, .png, .gif"
                                 onChange={this.onImagesChange.bind(this)}/>
                        </label>
                      </div>
                      <div className='col-sm-7' style={{marginLeft: '5px', fontSize: '0.8em'}}>注：Banner尺寸为314*180，图片为PNG
                        or JPG，图片大小建议小于100k。仅可添加一张图片
                      </div>
                    </div>
                    <div>{this.renderImage()}</div>
                  </div>
                </div>

                <div className='form-group row'>
                  <label className='form_label col-sm-2 col-form-label'>权重</label>
                  <div className='col-sm-4 d-flex'>
                    <input className="form-control col-sm-10" name='weight' required type="number" value={this.state.weight}
                           step="any" onChange={this.onValueChange.bind(this)}/>
                  </div>
                  <span style={{marginLeft: '2px', fontSize: '0.8em'}} className='d-flex align-items-center'><div>注：权重越大，品类排序越靠前</div></span>
                </div>

                <div className='form-group row'>
                  <label className='form_label col-sm-2 col-form-label'> </label>
                  <div className='col-sm-5 d-flex'>
                    <button className="btn btn-outline-success my-2 mx-4 my-sm-0" style={{width: '100px'}} type='submit'
                            name='formSubmit'>&nbsp; &nbsp;提交&nbsp; &nbsp;
                    </button>
                    <button className="btn btn-outline-success my-2 mx-4 my-sm-0" style={{width: '100px'}} type='button'
                            onClick={this.cancelAdd.bind(this)}>&nbsp; &nbsp;取消&nbsp; &nbsp;
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          }
          <h3 style={{textAlign: 'left', margin: '15px 25px'}}>一级品类管理</h3>
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
    categories: state.categories.categories,
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps, {fetchCategories, deleteCategory, addCategory, editCategory})(CategoriesContainer)

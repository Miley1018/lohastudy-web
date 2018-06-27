import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchCourseTags} from "../../actions/courses";
import {fetchCategories} from "../../actions/categories";
class Tags extends Component {
  constructor(props) {
    super(props)
    this.onSelectChange = this.onSelectChange.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.onAdd = this.onAdd.bind(this)
  }

  renderTagsSelection() {
    let tagsList = []
    for (let key in this.props.allTags) {
      const tag = this.props.allTags[key]
      const item = {
        id: tag.id,
        categoryName: this.props.allCategories[tag.category] && this.props.allCategories[tag.category].name,
        tagName: tag.name,
      }
      tagsList.push(item)
    }
    tagsList.sort((a,b)=>(a.categoryName+a.tagName).localeCompare(b.categoryName+b.tagName, 'zh-Hans-CN', {sensitivity: 'accent'}))
    return tagsList.map(item=>(
      <option key={item.id}
              value={item.id}>
        {item.categoryName} - {item.tagName}
      </option>))
  }
  componentWillMount() {
    this.props.fetchCourseTags()
    this.props.fetchCategories()
  }
  onSelectChange(e){
    const index = Number(e.target.name)
    const newTags = [...this.props.tags]
    newTags[index] = e.target.value
    this.emitChangedEvent(newTags)
  }
  onDelete(index){
    const newTags = [...this.props.tags]
    newTags.splice(index, 1)
    this.emitChangedEvent(newTags)
  }
  onAdd() {
    const newTagId = Object.keys(this.props.allTags)[0]
    this.emitChangedEvent([...this.props.tags, newTagId])
  }
  emitChangedEvent(newTags) {
    console.log(newTags)
    const newCategories = newTags.map(tagId=> this.props.allCategories[this.props.allTags[tagId].category].id)
    this.props.onTagsChanged && this.props.onTagsChanged(newTags, newCategories)
  }
  render() {
    if (!this.props.allTags
      || Object.keys(this.props.allTags).length === 0
      || !this.props.allCategories
      || Object.keys(this.props.allCategories).length === 0) {
      return <div>载入中。。。或者二级品类列表为空，请先添加</div>
    }
    return <div>
      {this.props.tags.map((tagId,i)=>(
        <div className='d-flex' key={i}>
          <select id="tagsSelect" className="form-control col-sm-8 mt-2"
                  name={i}
                  value={tagId}
                  onChange={this.onSelectChange}
                  style={{textAlignLast: 'center'}}>
            {this.renderTagsSelection()}
          </select>
          <button
            onClick={this.onDelete.bind(this, i)}
            className="btn btn-outline-dark my-2 mx-3 my-sm-2"
            type="button"
            style={{borderColor: '#5a5a5a', color: '#5a5a5a', width: '150px'}}
          >删除</button>
        </div>))}
      <button
        onClick={this.onAdd}
        className="btn btn-outline-dark my-2 mx-0 my-sm-2"
        type="button"
        style={{borderColor: '#5a5a5a', color: '#5a5a5a', width: '150px'}}>添加品类
      </button>
    </div>
  }
}

function mapStateToProps(state) {
  return {
    allTags: state.courses.tags,
    allCategories: state.categories.categories,
  }
}

export default connect(mapStateToProps, {fetchCourseTags, fetchCategories })(Tags)


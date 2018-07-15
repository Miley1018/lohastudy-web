import React from 'react'
import {connect} from 'react-redux'
import {fetchTags} from "../../actions/tags";

class TagList extends React.Component {
  componentWillMount() {
    if (!this.props.tags || Object.keys(this.props.tags).length === 0) {
      this.props.fetchTags()
    }
  }
  render() {
    let tagsList = []
    if (this.props.tags) {
      for (let key in this.props.tags) {
        const tag = this.props.tags[key]
        if (!this.props.category || tag.category === this.props.category) {
          tagsList.push({
            id: tag.id,
            name: tag.name,
          })
        }
      }
    }
    return (
      <select value={this.props.value} onChange={(e)=>this.props.onChange && this.props.onChange(e.target.value)}>
        <option value="">全部</option>
        {tagsList.map(tag=>(
          <option key={tag.id} value={tag.id}>
            {tag.name}
          </option>
        ))}
      </select>
    )
  }
}

function mapStateToProps(state) {
  return {
    tags: state.tags.tags,
  }
}

export default connect(mapStateToProps, {fetchTags})(TagList)

import React from 'react'
import {connect} from 'react-redux'
import {fetchCategories} from "../../actions/categories";

class CategoryList extends React.Component {
  componentWillMount() {
    if (!this.props.categories || Object.keys(this.props.categories).length === 0) {
      this.props.fetchCategories()
    }
  }
  render() {
    let categoriesList = []
    if (this.props.categories) {
      for (let key in this.props.categories) {
        categoriesList.push({
          id: this.props.categories[key].id,
          name: this.props.categories[key].name,
        })
      }
    }
    return (
      <select value={this.props.value} onChange={(e)=>this.props.onChange && this.props.onChange(e.target.value)}>
        <option value="">全部</option>
        {categoriesList.map(category=>(
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    )
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories.categories,
  }
}

export default connect(mapStateToProps, {fetchCategories})(CategoryList)


import React from 'react'
import { Input } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { searchPostsThunk } from '../../store'

class SearchBar extends React.Component {
  handleChange = (event, data) => {
    this.props.fetchPosts(data.value)
  }
  render() {
    return (
      <Input
        icon="search"
        placeholder="Search..."
        onChange={this.handleChange}
      />
    )
  }
}

const mapState = state => {
  return {
    queryString: state.post.queryString,
  }
}
const mapDispatch = dispatch => {
  return {
    fetchPosts: queryString => dispatch(searchPostsThunk(queryString)),
  }
}

export default connect(
  mapState,
  mapDispatch
)(SearchBar)

import React from 'react'
import { Input, Form, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { searchPostsThunk } from '../../store'

class SearchBar extends React.Component {
  constructor() {
    super()
    this.state = {
      keyword: '',
      radius: '',
    }
  }

  handleSubmit = () => {
    const { keyword, radius } = this.state
    this.props.fetchPosts(keyword, radius)
  }

  handleChange = (event, { name, value }) => {
    this.setState({ [name]: value })
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group inline>
          <Form.Field>
            <label>Keyword</label>
            <Input
              icon="search"
              placeholder="Search..."
              name="keyword"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Search Radius</label>
            <Input
              type="number"
              placeholder="Enter search radius"
              name="radius"
              onChange={this.handleChange}
            />
          </Form.Field>

          <Button primary>Search</Button>
        </Form.Group>
      </Form>
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
    fetchPosts: (queryString, radius) =>
      dispatch(searchPostsThunk(queryString, radius)),
  }
}

export default connect(
  mapState,
  mapDispatch
)(SearchBar)

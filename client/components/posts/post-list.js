import React from 'react'
import { connect } from 'react-redux'
import { getCategoriesPostsThunk } from '../../store'
import { Container } from 'semantic-ui-react'
import PostGroup from './post-group'
import history from '../../history'

class PostList extends React.Component {
  componentDidMount() {
    this.props.getCategories()
  }
  componentDidUpdate(prevProps) {
    if (prevProps.categories !== this.props.categories) {
      this.props.getCategories()
    }
  }
  choosePost(postId) {
    history.push(`/posts/${postId}`)
  }
  render() {
    const categories = this.props.categories
    return (
      <Container>
        {categories.map(category => {
          return (
            <PostGroup
              category={category}
              key={category.id}
              posts={category.posts}
            />
          )
        })}
      </Container>
    )
  }
}

const mapState = state => {
  return {
    categories: state.category.categories,
  }
}
const mapDispatch = dispatch => {
  return {
    getCategories: () => dispatch(getCategoriesPostsThunk()),
  }
}

export default connect(
  mapState,
  mapDispatch
)(PostList)

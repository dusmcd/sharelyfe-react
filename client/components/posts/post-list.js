import React from 'react'
import { connect } from 'react-redux'
import { getPostsThunk } from '../../store'
import SinglePost from './single-post'

class PostList extends React.Component {
  componentDidMount() {
    this.props.fetchPosts()
  }
  render() {
    const { posts } = this.props
    return (
      <div className="ui stackable grid container">
        {posts.map(post => {
          return <SinglePost key={post.id} post={post} />
        })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    posts: state.post.posts,
  }
}
const mapDispatch = dispatch => {
  return {
    fetchPosts: () => dispatch(getPostsThunk()),
  }
}

export default connect(
  mapState,
  mapDispatch
)(PostList)

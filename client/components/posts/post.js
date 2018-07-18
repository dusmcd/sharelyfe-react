import React from 'react'
import { connect } from 'react-redux'
import { getPostThunk } from '../../store'

class Post extends React.Component {
  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id)
  }
  render() {
    const { post } = this.props
    return (
      <div>
        <h1>{post.title}</h1>
        <img src={post.imageUrl} />
        <h3>{post.description}</h3>
        <h3>{`$${post.price}`}</h3>
        {post.user && (
          <p>
            <em>Posted by {post.user.name}</em>
          </p>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    post: state.post.currentPost,
  }
}
const mapDispatch = dispatch => {
  return {
    fetchPost: postId => dispatch(getPostThunk(postId)),
  }
}

export default connect(
  mapState,
  mapDispatch
)(Post)

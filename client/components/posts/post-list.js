import React from 'react'
import { connect } from 'react-redux'
import { getPostsThunk } from '../../store'
import SinglePost from './single-post'
import history from '../../history'

class PostList extends React.Component {
  componentDidMount() {
    this.props.fetchPosts()
  }
  choosePost(postId) {
    history.push(`/posts/${postId}`)
  }
  render() {
    const { posts } = this.props
    if (!posts) return <h2>No results found</h2>
    return (
      <div className="ui stackable grid container">
        {posts.map(post => {
          return (
            <SinglePost
              key={post.id}
              post={post}
              choosePost={this.choosePost}
            />
          )
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

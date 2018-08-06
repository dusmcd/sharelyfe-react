import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { getUserPostsThunk } from '../../store'
import UserPosts from './user-posts'

class UserDashboard extends React.Component {
  componentDidMount() {
    this.props.fetchPosts()
  }
  render() {
    const { posts } = this.props
    return <UserPosts posts={posts} />
  }
}

const mapState = state => {
  return {
    posts: state.profile.posts,
  }
}

const mapDispatch = dispatch => {
  return {
    fetchPosts: () => dispatch(getUserPostsThunk()),
  }
}

export default connect(
  mapState,
  mapDispatch
)(UserDashboard)

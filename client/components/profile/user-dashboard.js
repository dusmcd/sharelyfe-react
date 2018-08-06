import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import { getUserPostsThunk, getUserBookingsThunk } from '../../store'
import UserPosts from './user-posts'
import UserBookings from './user-bookings'

class UserDashboard extends React.Component {
  componentDidMount() {
    this.props.fetchPosts()
    this.props.fetchBookings()
  }
  render() {
    const { posts, bookings } = this.props
    return (
      <Container>
        <UserBookings bookings={bookings} />
        <UserPosts posts={posts} />
      </Container>
    )
  }
}

const mapState = state => {
  return {
    posts: state.profile.posts,
    bookings: state.profile.bookings,
  }
}

const mapDispatch = dispatch => {
  return {
    fetchPosts: () => dispatch(getUserPostsThunk()),
    fetchBookings: () => dispatch(getUserBookingsThunk()),
  }
}

export default connect(
  mapState,
  mapDispatch
)(UserDashboard)

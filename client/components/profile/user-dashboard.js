import React from 'react'
import { connect } from 'react-redux'
import { Container, Tab } from 'semantic-ui-react'
import { getUserPostsThunk, getUserBookingsThunk } from '../../store'
import UserPosts from './user-posts'
import UserBookings from './user-bookings'

class UserDashboard extends React.Component {
  componentDidMount() {
    const { posts, bookings } = this.props
    if ((posts && !posts.length) || (bookings && !bookings.length)) {
      this.props.fetchPosts()
      this.props.fetchBookings()
    }
  }
  render() {
    const { posts, bookings } = this.props
    const panes = [
      {
        menuItem: 'My Reservations',
        render: () => (
          <Tab.Pane as="div">
            <UserBookings bookings={bookings} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'My Posts',
        render: () => (
          <Tab.Pane as="div">
            <UserPosts posts={posts} />
          </Tab.Pane>
        ),
      },
    ]
    return (
      <Container>
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
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

import React from 'react'
import UserDashboard from '../profile/user-dashboard'
import { connect } from 'react-redux'

class UserProfile extends React.Component {
  componentDidMount() {
    // get user bookings and posts
  }
  render() {
    return (
      <UserDashboard bookings={this.props.bookings} posts={this.props.posts} />
    )
  }
}

const mapDispatch = dispatch => {
  return {
    getUserBookings: userId => console.log('get bookings'),
    getUserPosts: userId => console.log('get user posts'),
  }
}

export default connect(
  null,
  mapDispatch
)(UserProfile)

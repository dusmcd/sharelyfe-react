import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUserThunk } from './store'

const UserNav = props => {
  const isLoggedIn = props.currentUser
  return (
    <div>
      {isLoggedIn ? (
        <ul>
          <li>
            <a href="#" onClick={() => props.logout()}>
              Logout
            </a>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      )}
    </div>
  )
}

const mapState = state => {
  return {
    currentUser: state.user.user,
  }
}
const mapDispatch = dispatch => {
  return {
    logout: () => dispatch(logoutUserThunk()),
  }
}

export default connect(
  mapState,
  mapDispatch
)(UserNav)

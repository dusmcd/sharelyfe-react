import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Icon } from 'semantic-ui-react'
import { logoutUserThunk } from './store'
import styled from 'styled-components'

const UserContainer = styled.ul`
  display: flex;
  list-style: none;
  justify-content: space-around;
`

const UserNav = props => {
  const isLoggedIn = !!props.currentUser.id
  return (
    <div>
      {isLoggedIn ? (
        <UserContainer>
          <li>
            <a href="#" onClick={() => props.logout()}>
              Logout
            </a>
          </li>

          <li>
            <Link to="/posts/new">
              <Button icon labelPosition="right">
                <Icon name="plus" />
                Post Rental
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/posts">All Posts</Link>
          </li>
        </UserContainer>
      ) : (
        <UserContainer>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/posts">All Posts</Link>
          </li>
        </UserContainer>
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

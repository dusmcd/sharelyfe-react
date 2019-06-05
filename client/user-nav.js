import React from 'react'
import { connect } from 'react-redux'
import { Button, Icon } from 'semantic-ui-react'
import { logoutUserThunk } from './store'
import history from './history'
import {
  StyledLink,
  Nav,
  LogoContainer,
  UserContainer,
  LinkContainer,
} from './styles'

const AddButton = () => {
  return (
    <StyledLink to="/posts/new">
      <Button icon labelPosition="right" color="blue">
        <Icon name="plus" />
        Post Rental
      </Button>
    </StyledLink>
  )
}
class UserNav extends React.Component {
  logoutUser = () => {
    this.props.logout().then(() => history.push('/posts'))
  }
  render() {
    const isLoggedIn = !!this.props.currentUser.id
    return (
      <Nav>
        <LogoContainer>
          <StyledLink to="/">ShareLyfe</StyledLink>
        </LogoContainer>
        {isLoggedIn ? (
          <UserContainer>
            <AddButton />
            <LinkContainer>
              <StyledLink to="/me">My Profile</StyledLink>
              <StyledLink to="#" onClick={() => this.logoutUser()}>
                Logout
              </StyledLink>
              <StyledLink to="/posts">All Posts</StyledLink>
            </LinkContainer>
          </UserContainer>
        ) : (
          <UserContainer>
            <LinkContainer>
              <StyledLink to="/login">Login</StyledLink>
              <StyledLink to="/signup">Sign Up</StyledLink>
              <StyledLink to="/posts">All Posts</StyledLink>
            </LinkContainer>
          </UserContainer>
        )}
      </Nav>
    )
  }
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

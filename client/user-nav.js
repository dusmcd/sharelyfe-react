import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Icon } from 'semantic-ui-react'
import { logoutUserThunk } from './store'
import styled from 'styled-components'
import history from './history'

const UserContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 45%;
  margin: auto 0;
`
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  background-color: #3d3a3a;
  padding: 22px;
  margin-bottom: 10px;
  font-size: 18px;
`
const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
`
const LogoContainer = styled.section`
  margin: auto 0;
`
const LinkContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: auto 0;
  flex-grow: 1;
`
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

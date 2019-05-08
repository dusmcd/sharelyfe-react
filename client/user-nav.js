import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Icon } from 'semantic-ui-react'
import { logoutUserThunk } from './store'
import { SearchBar } from './components'
import styled from 'styled-components'
import history from './history'

const UserContainer = styled.ul`
  display: flex;
  list-style: none;
  justify-content: space-around;
`
const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`

class UserNav extends React.Component {
  constructor() {
    super()
    this.state = {
      showSearchBar: false,
    }
  }
  logoutUser = () => {
    this.props.logout().then(() => history.push('/posts'))
  }
  toggleSearchBar = () => {
    if (this.state.showSearchBar) {
      this.setState({ showSearchBar: false })
    } else {
      this.setState({ showSearchBar: true })
    }
  }
  render() {
    const isLoggedIn = !!this.props.currentUser.id
    return (
      <div>
        {isLoggedIn ? (
          <UserContainer>
            <li>
              <Link to="/me">My Profile</Link>
            </li>
            <li>
              <a href="#" onClick={() => this.logoutUser()}>
                Logout
              </a>
            </li>
            <li>
              <a href="#" onClick={this.toggleSearchBar}>
                <Icon name="search" />
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
        {this.state.showSearchBar && (
          <SearchBarContainer>
            <SearchBar />
          </SearchBarContainer>
        )}
      </div>
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

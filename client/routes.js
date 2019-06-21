import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import Landing from './landing'
import {
  SignUp,
  Login,
  PostList,
  Post,
  AddPost,
  UserDashboard,
  UserList,
  NotFound,
  CategoryPosts,
} from './components'
import { connect } from 'react-redux'
import { getUserThunk } from './store'

class Routes extends React.Component {
  componentDidMount() {
    this.props.getUser()
  }
  componentDidUpdate(prevProps) {
    if (this.props.user.id !== prevProps.user.id) {
      this.props.getUser()
    }
  }
  render() {
    const isLoggedIn = !!this.props.user.id
    const isAdmin = this.props.user.isAdmin
    return (
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        {isLoggedIn && <Route exact path="/posts/new" component={AddPost} />}
        <Route path="/posts/:id" component={Post} />
        <Route path="/posts" component={PostList} />
        <Route path="/categories/:id/posts" component={CategoryPosts} />
        {isLoggedIn && <Route path="/me" component={UserDashboard} />}
        {isAdmin && <Route path="/admin/userManagement" component={UserList} />}
        <Route path="/" component={NotFound} />
      </Switch>
    )
  }
}

const mapState = state => {
  return {
    user: state.user.user,
  }
}

const mapDispatch = dispatch => {
  return {
    getUser: () => dispatch(getUserThunk()),
  }
}

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Routes)
)

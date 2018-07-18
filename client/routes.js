import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import Landing from './landing'
import { SignUp, Login, PostList } from './components'
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
    return (
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/posts" component={PostList} />
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

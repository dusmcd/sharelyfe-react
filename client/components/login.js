import React from 'react'
import { connect } from 'react-redux'
import history from '../history'
import { Form, Input } from './utility'
import { loginUserThunk, setErrorAction } from '../store'

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
    }
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    this.props.loginUser(this.state).then(() => {
      if (!this.props.error) {
        history.push('/')
      } else {
        this.props.user.id && this.props.resetError() && history.push('/')
      }
    })
  }
  componentWillUnmount() {
    this.props.resetError()
  }
  render() {
    return (
      <Form handleChange={this.handleChange} handleSubmit={this.handleSubmit}>
        <Input
          type="text"
          name="email"
          placeholder="Email"
          label="Email"
          value={this.state.email}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          label="Password"
          value={this.state.password}
        />
        <button className="ui primary button" type="submit">
          Login
        </button>
        {this.props.error && (
          <div className="ui red message">{this.props.error}</div>
        )}
      </Form>
    )
  }
}

const mapState = state => {
  return {
    error: state.user.error,
    user: state.user.user,
  }
}

const mapDispatch = dispatch => {
  return {
    loginUser: formData => dispatch(loginUserThunk(formData)),
    resetError: () => dispatch(setErrorAction(false)),
  }
}

export default connect(
  mapState,
  mapDispatch
)(Login)

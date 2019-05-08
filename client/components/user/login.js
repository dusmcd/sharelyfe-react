import React from 'react'
import { connect } from 'react-redux'
import history from '../../history'
import { Input } from '../utility'
import { Form, Button, Message, Container } from 'semantic-ui-react'
import { loginUserThunk, setErrorAction } from '../../store'

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
        history.push('/me')
      } else {
        this.props.user.id && this.props.resetError() && history.push('/me')
      }
    })
  }
  componentWillUnmount() {
    this.props.resetError()
  }
  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            name="email"
            placeholder="Email"
            label="Email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            label="Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <Button primary type="submit">
            Login
          </Button>
          {this.props.error && (
            <Message color="red">{this.props.error}</Message>
          )}
        </Form>
      </Container>
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

import React from 'react'
import { connect } from 'react-redux'
import { Form, Input } from './utility'
import { createUserThunk } from '../store'
import history from '../history'

class SignUp extends React.Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
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
    this.props.createUser(this.state).then(() => history.push('/'))
  }
  render() {
    return (
      <Form handleChange={this.handleChange} handleSubmit={this.handleSubmit}>
        <Input
          type="text"
          placeholder="First Name"
          label="First Name"
          name="firstName"
          value={this.state.firstName}
        />
        <Input
          type="text"
          placeholder="Last Name"
          label="Last Name"
          name="lastName"
          value={this.state.lastName}
        />
        <Input type="text" placeholder="Email" label="Email" name="email" />
        <Input
          type="password"
          placeholder="Password"
          label="Password"
          name="password"
          value={this.state.password}
        />
        <button type="submit" className="ui primary button">
          Sign Up
        </button>
      </Form>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    createUser: formData => dispatch(createUserThunk(formData)),
  }
}

export default connect(
  null,
  mapDispatch
)(SignUp)

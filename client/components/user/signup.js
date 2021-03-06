import React from 'react';
import { connect } from 'react-redux';
import { Input } from '../utility';
import { Form, Button, Container } from 'semantic-ui-react';
import { createUserThunk } from '../../store';
import history from '../../history';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      username: '',
    };
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.createUser(this.state).then(() => history.push('/posts'));
  };
  render() {
    return (
      <Container>
        <Form onChange={this.handleChange} onSubmit={this.handleSubmit}>
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
          <Input
            type="text"
            placeholder="Username"
            label="Username"
            name="username"
            value={this.state.username}
          />
          <Input
            type="text"
            placeholder="Email"
            label="Email"
            name="email"
            value={this.state.email}
          />
          <Input
            type="password"
            placeholder="Password"
            label="Password"
            name="password"
            value={this.state.password}
          />
          <Button type="submit" primary>
            Sign Up
          </Button>
        </Form>
      </Container>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    createUser: formData => dispatch(createUserThunk(formData)),
  };
};

export default connect(
  null,
  mapDispatch
)(SignUp);

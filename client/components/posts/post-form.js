import React from 'react'
import { connect } from 'react-redux'
import { Form, Button, Container } from 'semantic-ui-react'
import { Input } from '../utility'
import { handleInputAction } from '../../store'

class PostForm extends React.Component {
  handleChange = event => {
    this.props.handleChange({ [event.target.name]: event.target.value })
  }
  handleSubmit = event => {
    event.preventDefault()
  }
  render() {
    const { title, description, price } = this.props.input
    return (
      <Container>
        <Form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <Input
            label="Title"
            name="title"
            placeholder="Title"
            value={title}
            type="text"
          />
          <Input
            label="Description"
            name="description"
            placeholder="Description"
            value={description}
            type="text"
          />
          <Input
            label="Price"
            name="price"
            placeholder="Price"
            value={price}
            type="text"
          />
          <Button primary type="submit">
            Create Post
          </Button>
        </Form>
      </Container>
    )
  }
}

const mapState = state => {
  return {
    input: state.post.input,
  }
}

const mapDispatch = dispatch => {
  return {
    handleChange: formData => dispatch(handleInputAction(formData)),
  }
}

export default connect(
  mapState,
  mapDispatch
)(PostForm)

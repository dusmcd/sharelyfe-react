import React from 'react'
import { connect } from 'react-redux'
import { Form, Button, Container } from 'semantic-ui-react'
import { Input } from '../utility'
import { handleInputAction } from '../../store'
import history from '../../history'

class PostForm extends React.Component {
  handleChange = event => {
    this.props.handleChange({ [event.target.name]: event.target.value })
  }
  handleSubmit = event => {
    event.preventDefault()
    console.log('form data:', this.props.input)
    this.props.submitAction(this.props.input).then(action => {
      history.push(`/posts/${action.post.id}`)
    })
  }
  handleFile = event => {
    const file = event.target.files[0]
    this.props.handleChange({ file })
  }
  render() {
    const { title, description, price } = this.props.input
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Input
            label="Title"
            name="title"
            placeholder="Title"
            value={title}
            type="text"
            onChange={this.handleChange}
          />
          <Input
            label="Description"
            name="description"
            placeholder="Description"
            value={description}
            type="text"
            onChange={this.handleChange}
          />
          <Input
            label="Price"
            name="price"
            placeholder="Price"
            value={price}
            type="text"
            onChange={this.handleChange}
          />
          <Input
            label="Image"
            name="imageFile"
            type="file"
            onChange={this.handleFile}
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

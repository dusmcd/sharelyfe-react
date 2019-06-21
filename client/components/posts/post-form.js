import React from 'react'
import { connect } from 'react-redux'
import { Form, Button, Container, Dropdown } from 'semantic-ui-react'
import { Input } from '../utility'
import { handleInputAction, getCategoriesThunk } from '../../store'
import history from '../../history'

class PostForm extends React.Component {
  componentDidMount() {
    this.props.getCategories()
  }

  handleCategoryChange = (_event, data) => {
    this.props.handleChange({ category: data.value })
  }

  handleChange = event => {
    this.props.handleChange({ [event.target.name]: event.target.value })
  }
  handleSubmit = event => {
    event.preventDefault()
    this.props.submitAction(this.props.input).then(action => {
      console.log('ACTION:', action)
      history.push(`/posts/${action.post.id}`)
    })
  }
  handleFile = event => {
    const file = event.target.files[0]
    this.props.handleChange({ file })
  }
  render() {
    const { title, description, price } = this.props.input
    const categories = this.props.categories.map(category => {
      return { key: category.id, value: category.id, text: category.name }
    })
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
          <div className="small-input">
            <Input
              label="Price"
              name="price"
              placeholder="Price"
              value={price}
              type="text"
              onChange={this.handleChange}
              isPrice={true}
              className="input-align"
            />
            <Form.Field className="input-align">
              <label>Category</label>
              <Dropdown
                selection
                options={categories}
                onChange={this.handleCategoryChange}
              />
            </Form.Field>
          </div>
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
    categories: state.category.categories,
  }
}

const mapDispatch = dispatch => {
  return {
    handleChange: formData => dispatch(handleInputAction(formData)),
    getCategories: () => dispatch(getCategoriesThunk()),
  }
}

export default connect(
  mapState,
  mapDispatch
)(PostForm)

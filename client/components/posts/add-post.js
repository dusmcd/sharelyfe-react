import React from 'react'
import PostForm from './post-form'
import { addPostThunk, handleInputAction } from '../../store'
import { connect } from 'react-redux'

class AddPost extends React.Component {
  componentDidMount() {
    this.props.resetInput()
  }
  render() {
    const { addPost } = this.props
    return <PostForm submitAction={addPost} />
  }
}

const mapDispatch = dispatch => {
  return {
    addPost: formData => dispatch(addPostThunk(formData)),
    resetInput: () =>
      dispatch(handleInputAction({ title: '', description: '', price: '' })),
  }
}

export default connect(
  null,
  mapDispatch
)(AddPost)

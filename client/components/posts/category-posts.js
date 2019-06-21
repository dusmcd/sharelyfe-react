import React from 'react'
import { connect } from 'react-redux'
import { getCategoryInfoThunk } from '../../store'
import { Segment, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import {
  PostDetail,
  ImgContainer,
  Thumbnail,
  InfoContainer,
} from '../../styles'

class CategoryPosts extends React.Component {
  componentDidMount() {
    // fetch posts by category
    this.props.getCategoryInfo(this.props.match.params.id)
  }

  render() {
    const { posts } = this.props.category
    if (!posts) return <div>LOADING...</div>
    return (
      <Container>
        <h1>{this.props.category.name}</h1>
        <Segment.Group>
          {posts.map(post => {
            return (
              <Segment key={post.id}>
                <PostDetail>
                  <ImgContainer>
                    <Thumbnail src={post.imageUrl} />
                  </ImgContainer>
                  <InfoContainer>
                    <div>
                      <h4>
                        <Link to={`/posts/${post.id}`}>{post.title}</Link>
                      </h4>
                      <p>
                        ${post.price}
                        /day
                      </p>
                      <p>{post.description}</p>
                    </div>
                  </InfoContainer>
                </PostDetail>
              </Segment>
            )
          })}
        </Segment.Group>
      </Container>
    )
  }
}

const mapState = state => {
  return {
    category: state.category.categoryInfo,
  }
}

const mapDispatch = dispatch => {
  return {
    getCategoryInfo: categoryId => dispatch(getCategoryInfoThunk(categoryId)),
  }
}

export default connect(
  mapState,
  mapDispatch
)(CategoryPosts)

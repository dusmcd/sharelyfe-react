import React from 'react'
import { connect } from 'react-redux'
import { Image, Container, Card, Modal, Button } from 'semantic-ui-react'
import { getPostThunk } from '../../store'
import BookingCalendar from './booking-calendar'
import ConfirmationPopup from './confirmation-popup'

class Post extends React.Component {
  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id)
  }
  render() {
    const { post } = this.props
    const Trigger = <Button color="green">Complete Reservation</Button>
    return (
      <Container>
        <Card fluid>
          <Image src={post.imageUrl} fluid />
          <Card.Content>
            <Card.Header>{post.title}</Card.Header>
            <Card.Meta>
              {post.user && (
                <p>
                  <em>Posted by {post.user.name}</em>
                </p>
              )}
            </Card.Meta>
            <Card.Description>
              <h3>{post.description}</h3>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <h3>{`$${post.price}`}</h3>
          </Card.Content>
        </Card>
        <BookingCalendar />
        <ConfirmationPopup Trigger={Trigger} />
      </Container>
    )
  }
}

const mapState = state => {
  return {
    post: state.post.currentPost,
  }
}
const mapDispatch = dispatch => {
  return {
    fetchPost: postId => dispatch(getPostThunk(postId)),
  }
}

export default connect(
  mapState,
  mapDispatch
)(Post)

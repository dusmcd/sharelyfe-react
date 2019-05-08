import React from 'react'
import { connect } from 'react-redux'
import { Image, Container, Card, Button } from 'semantic-ui-react'
import { getPostThunk, setFetchAction } from '../../store'
import BookingCalendar from './booking-calendar'
import ConfirmationPopup from './confirmation-popup'
import { CalendarContainer } from './post-styles'
import NotFound from '../not-found'

class Post extends React.Component {
  componentDidMount() {
    const postId = this.props.match.params.id
    !isNaN(postId) && this.props.fetchPost(this.props.match.params.id)
  }
  render() {
    const { post } = this.props
    const postId = this.props.match.params.id
    const Trigger = <Button color="green">Complete Reservation</Button>
    if (isNaN(postId)) {
      return <NotFound />
    }
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
        <ConfirmationPopup Trigger={Trigger} post={post} />
        <CalendarContainer>
          <BookingCalendar post={post} />
        </CalendarContainer>
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
    setFetch: status => dispatch(setFetchAction(status)),
  }
}

export default connect(
  mapState,
  mapDispatch
)(Post)

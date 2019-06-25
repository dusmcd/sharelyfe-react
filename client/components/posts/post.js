import React from 'react'
import { connect } from 'react-redux'
import { Image, Container, Card, Button } from 'semantic-ui-react'
import { getPostThunk, setFetchAction, clearDateAction } from '../../store'
import BookingCalendar from './booking-calendar'
import ConfirmationPopup from './confirmation-popup'
import { CalendarContainer } from './post-styles'
import NotFound from '../not-found'

class Post extends React.Component {
  constructor() {
    super()
    this.state = {
      showBookingForm: false,
    }
  }
  componentDidMount() {
    const postId = this.props.match.params.id
    !isNaN(postId) && this.props.fetchPost(this.props.match.params.id)
  }
  handleButtonClick = () => {
    this.setState({ showBookingForm: true })
  }
  handleCancel = () => {
    this.setState({ showBookingForm: false })
    this.props.clearDates()
  }
  render() {
    const { post } = this.props
    const isLoggedIn = !!this.props.user.id
    const postId = this.props.match.params.id
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
        {isLoggedIn && this.state.showBookingForm ? (
          <div>
            <ConfirmationPopup post={post} />
            <CalendarContainer>
              <BookingCalendar post={post} />
            </CalendarContainer>
            <Button color="red" onClick={this.handleCancel}>
              Cancel
            </Button>
          </div>
        ) : (
          isLoggedIn && (
            <Button primary onClick={this.handleButtonClick}>
              Reserve Item
            </Button>
          )
        )}
      </Container>
    )
  }
}

const mapState = state => {
  return {
    post: state.post.currentPost,
    user: state.user.user,
  }
}
const mapDispatch = dispatch => {
  return {
    fetchPost: postId => dispatch(getPostThunk(postId)),
    setFetch: status => dispatch(setFetchAction(status)),
    clearDates: () => dispatch(clearDateAction()),
  }
}

export default connect(
  mapState,
  mapDispatch
)(Post)

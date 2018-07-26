import React from 'react'
import { Modal, Table, Button, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import {
  createBookingThunk,
  setLoadStatusAction,
  bookingCompleteAction,
} from '../../store'

class ConfirmationPopup extends React.Component {
  componentDidMount() {
    this.props.setStatus(false)
    this.props.setBookingStatus(false)
  }
  createBooking = (postId, formData) => {
    this.props.createBooking(postId, formData)
  }
  handleClose = () => {
    this.props.setBookingStatus(false)
  }

  render() {
    const { post, dates, isLoading, bookingComplete } = this.props
    if (!dates.length) return null
    const bookingData = {
      startDate: dates[0],
      endDate: dates[1],
      price: post.price,
      payment: 'Cash',
    }

    return (
      <Modal trigger={this.props.Trigger} closeIcon onClose={this.handleClose}>
        <Modal.Header>
          Please Confirm Your Reservation Details Below
        </Modal.Header>
        <Modal.Content>
          {!isLoading ? (
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell singleLine>Rental Item</Table.HeaderCell>
                  <Table.HeaderCell>Price</Table.HeaderCell>
                  <Table.HeaderCell>Dates</Table.HeaderCell>
                  <Table.HeaderCell>Owner</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell singleLine>{post.title}</Table.Cell>
                  <Table.Cell>${post.price}/day</Table.Cell>
                  <Table.Cell>
                    {dates[0].toDateString()}-{dates[1].toDateString()}
                  </Table.Cell>
                  <Table.Cell>{post.user.username}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          ) : (
            <div>LOADING...</div>
          )}
          {bookingComplete && (
            <Message
              success
              header="Your reservation has been completed"
              content="You will receive an email with your reservation details shortly. Please see My Reservations page for all activity."
            />
          )}
          <Button
            onClick={() => this.createBooking(post.id, bookingData)}
            type="submit"
            primary
          >
            Confirm Reservation
          </Button>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapState = state => {
  return {
    dates: state.booking.dates,
    isLoading: state.booking.isLoading,
    bookingComplete: state.booking.bookingComplete,
  }
}
const mapDispatch = dispatch => {
  return {
    createBooking: (postId, formData) =>
      dispatch(createBookingThunk(postId, formData)),
    setStatus: status => dispatch(setLoadStatusAction(status)),
    setBookingStatus: status => dispatch(bookingCompleteAction(status)),
  }
}

export default connect(
  mapState,
  mapDispatch
)(ConfirmationPopup)

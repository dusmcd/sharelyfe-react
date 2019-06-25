import React from 'react'
import { Modal, Table, Button, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import {
  createBookingThunk,
  setLoadStatusAction,
  bookingCompleteAction,
  buttonStatusAction,
  clearDateAction,
} from '../../store'

class ConfirmationPopup extends React.Component {
  componentDidMount() {
    this.props.setStatus(false)
    this.props.setBookingStatus(false)
    this.props.setButtonStatus(false)
  }
  createBooking = (postId, formData) => {
    this.props
      .createBooking(postId, formData)
      .then(() => this.props.setButtonStatus(true))
  }
  handleClose = () => {
    this.props.setBookingStatus(false)
    this.props.clearDates()
  }

  render() {
    const { post, isLoading, bookingComplete, disabled } = this.props
    let { startDate, endDate } = this.props
    let Trigger
    if (!startDate || !endDate) {
      startDate = new Date()
      endDate = new Date()
      Trigger = (
        <Button color="green" disabled={true}>
          Complete Reservation
        </Button>
      )
    } else {
      Trigger = <Button color="green">Complete Reservation</Button>
    }
    const bookingData = {
      startDate: startDate,
      endDate: endDate,
      price: post.price,
      payment: 'Cash',
    }

    return (
      <Modal trigger={Trigger} closeIcon onClose={this.handleClose}>
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
                  <Table.Cell>
                    ${post.price}
                    /day
                  </Table.Cell>
                  <Table.Cell>
                    {startDate.toDateString()}-{endDate.toDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    {post && post.user && post.user.username}
                  </Table.Cell>
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
              content="Please see My Reservations page for all activity."
            />
          )}
          <Button
            onClick={() => this.createBooking(post.id, bookingData)}
            type="submit"
            primary
            disabled={disabled}
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
    startDate: state.booking.startDate,
    endDate: state.booking.endDate,
    isLoading: state.booking.isLoading,
    bookingComplete: state.booking.bookingComplete,
    disabled: state.booking.buttonDisabled,
  }
}
const mapDispatch = dispatch => {
  return {
    createBooking: (postId, formData) =>
      dispatch(createBookingThunk(postId, formData)),
    setStatus: status => dispatch(setLoadStatusAction(status)),
    setBookingStatus: status => dispatch(bookingCompleteAction(status)),
    setButtonStatus: status => dispatch(buttonStatusAction(status)),
    clearDates: () => dispatch(clearDateAction()),
  }
}

export default connect(
  mapState,
  mapDispatch
)(ConfirmationPopup)

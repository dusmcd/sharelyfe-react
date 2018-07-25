import React from 'react'
import { Modal, Table } from 'semantic-ui-react'
import { connect } from 'react-redux'

const ConfirmationPopup = props => {
  const { post, dates } = props
  if (!dates.length) return null
  return (
    <Modal trigger={props.Trigger}>
      <Modal.Header>Please Confirm Your Reservation Details Below</Modal.Header>
      <Modal.Content>
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
      </Modal.Content>
    </Modal>
  )
}

const mapState = state => {
  return {
    dates: state.booking.dates,
  }
}

export default connect(mapState)(ConfirmationPopup)

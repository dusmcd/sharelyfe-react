import React from 'react'
import { Modal } from 'semantic-ui-react'

const ConfirmationPopup = props => {
  return (
    <Modal trigger={props.Trigger}>
      <Modal.Header>Please Confirm Your Reservation Details Below</Modal.Header>
      <Modal.Content>
        <p>Details Here</p>
      </Modal.Content>
    </Modal>
  )
}

export default ConfirmationPopup

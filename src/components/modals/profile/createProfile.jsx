import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'

import FormsProfileCreate from '@/components/forms/profile/createProfile'

const CompsModalCreateProfile = ({ close, onSubmit }) => (
  <Modal show onHide={close}>
    <Modal.Header closeButton>
      <Modal.Title>Create Profile for this game</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <FormsProfileCreate
        onSubmit={onSubmit}
      />
    </Modal.Body>
  </Modal>
)
CompsModalCreateProfile.propTypes = {
  close: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default CompsModalCreateProfile

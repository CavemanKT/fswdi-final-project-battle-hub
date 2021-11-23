import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'

import FormsAuthSignup from '@/components/forms/auth/signup'

const ModalsSignup = ({ close, onSubmit }) => (
  <Modal show onHide={close}>
    <Modal.Header closeButton>
      <Modal.Title>Signup</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <FormsAuthSignup
        onSubmit={onSubmit}
      />
    </Modal.Body>
  </Modal>
)
ModalsSignup.propTypes = {
  close: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default ModalsSignup

import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'

import FormsAuthLogin from '@/components/forms/auth/login'

const ModalsLogin = ({ close, onSubmit }) => (
  <Modal show onHide={close}>
    <Modal.Header closeButton>
      <Modal.Title>Login</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <FormsAuthLogin
        onSubmit={onSubmit}
      />
    </Modal.Body>
  </Modal>
)
ModalsLogin.propTypes = {
  close: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default ModalsLogin

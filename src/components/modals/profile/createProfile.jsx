import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'

import FormsProfileCreate from '@/components/forms/profile/createProfile'

// _hocs
import withPrivateRoute from '@/_hocs/withPrivateRoute'

const CompsModalCreateProfile = ({ close, onSubmit, gameTitle }) => (
  <Modal show onHide={close}>
    <Modal.Header closeButton>
      <Modal.Title>Create Profile for this game</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <FormsProfileCreate
        gameTitle={gameTitle}
        onSubmit={onSubmit}
      />
    </Modal.Body>
  </Modal>
)
CompsModalCreateProfile.propTypes = {
  close: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  gameTitle: PropTypes.string.isRequired
}

export default withPrivateRoute(CompsModalCreateProfile)

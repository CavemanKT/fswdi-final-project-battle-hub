import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import React, { useRef, useState } from 'react'

const compsModalHistory = ({ data, close }) => {
  console.log(data)
  return (

    <Modal fullscreen show onHide={close} className="modal-fullscreen">
      <Modal.Header closeButton className="d-flex">
        <Modal.Title>
          {data.characterName}&#39;s Match history
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          asdf
        </div>

      </Modal.Body>
    </Modal>
  )
}

compsModalHistory.propTypes = {
  close: PropTypes.func.isRequired,
  data: PropTypes.shape().isRequired
}

export default compsModalHistory

import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'


const ModalsCandidateList = ({ close, candidates }) => (
  <div id="ModalsCandidateList">
  <Modal show onHide={close}>
    <Modal.Header closeButton>
      <Modal.Title>Candidates</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <ul>
        {/* <li>{candidates}</li> */}
      </ul>
    </Modal.Body>
  </Modal>


  </div>
)

ModalsCandidateList.propTypes = {
  close: PropTypes.func.isRequired,
}

export default ModalsCandidateList

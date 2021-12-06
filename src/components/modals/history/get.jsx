import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'
import React from 'react'

import LineChart from '@/components/charts/line-chart'

const compsModalHistory = ({ data, target, close }) => (
  <Modal fullscreen show onHide={close} className="modal-fullscreen">
    <Modal.Header closeButton className="d-flex">
      <Modal.Title>
        {data.User.name}&#39;s Match history
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div>
        <LineChart
          historyData={data}
          historyTarget={target}
        />
      </div>
    </Modal.Body>
  </Modal>
)

compsModalHistory.propTypes = {
  close: PropTypes.func.isRequired,
  data: PropTypes.shape().isRequired
}

export default compsModalHistory

import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'
import React, { useState } from 'react'
import Table from 'react-bootstrap/Table'
import useHistory from '@/_hooks/history'

const CompsModalHistoryList = ({ data, close }) => (
  <Modal fullscreen show onHide={close} className="modal-fullscreen">
    <Modal.Header closeButton className="d-flex">
      <Modal.Title>

        {
          data?.history[0] && (
            <div>
              {data?.history[0].Profile.characterName}&#39;s Match history
            </div>
          )
        }
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {
        !data?.history[0] && (
          <div className="container justify-content-center">
            <h2 className="text-center m-5 p-5">This user has never fought before.</h2>

          </div>
        )
      }
      {
        data?.history[0] && (
          <div className="inspector-dash-board">
            <div className="container justify-content-center history-list-container">
              <div className="history-list-wrapper">
                <Table responsive>
                  <thead>
                    <tr>
                      <th />
                      <th>result</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
          data?.history.map((item, i) => (
            <tr key={item.id}>
              <td><p className="mt-3">{i + 1}</p></td>
              <td><p className="mt-3">{item.result}</p></td>
              <td><p className="mt-3">{`${item.createdAt.split('-')[0]}-${item.createdAt.split('-')[1]}`}</p></td>
            </tr>
          ))
        }
                  </tbody>
                </Table>
              </div>

            </div>
          </div>

        )
      }
    </Modal.Body>
  </Modal>
)

CompsModalHistoryList.propTypes = {
  close: PropTypes.func.isRequired,
  data: PropTypes.shape().isRequired
}

export default CompsModalHistoryList

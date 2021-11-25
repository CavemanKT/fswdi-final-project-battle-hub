import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

import useInvitation from '@/_hooks/invitation'

const CompsModalGetProfile = ({ data, close }) => {
  const { invitation, isLoding, error, createInvitation } = useInvitation(data.id) // useSWR or axios

  const handleInvitationSubmit = (profileId) => {
    // createInvitation(profileId).then(() => {
    //   setState
    // })
  }

  const keyArr = Object.keys(data)
  const valueArr = Object.values(data)
  const userData = valueArr[13]

  // get rid of id, createdBy... atrributes
  keyArr.splice(0, 1)
  keyArr.splice(6, 7)
  valueArr.splice(0, 1)
  valueArr.splice(6, 7)

  // destructure User object
  const keyArrUser = Object.keys(userData)
  const valueArrUser = Object.values(userData)

  // only keep Name and Type
  keyArrUser.splice(0, 1)
  keyArrUser.splice(1, 4)
  keyArrUser.splice(2, 2)
  valueArrUser.splice(0, 1)
  valueArrUser.splice(1, 4)
  valueArrUser.splice(2, 2)

  return (

    <Modal fullscreen show onHide={close} className="modal-fullscreen">
      <Modal.Header closeButton className="d-flex">
        <Modal.Title>{data.characterName}&#39;s Profile</Modal.Title>
        <Button onClick={() => handleInvitationSubmit(data.id)} variant="outline-danger" className="text-center">Danger</Button>

      </Modal.Header>
      <Modal.Body>

        <div id="profile-container" className="position-relative">
          <div className="profile-wrapper row">

            {/* needs images and video */}
            <div className="left-column col" />

            <div className="right-column col">
              <Table responsive>
                <thead>
                  <tr className="tr-font">
                    <th>Character</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="d-flex flex-column">
                    {
                      keyArr && keyArr.map((item, i) => (
                        <td key={item} className="d-flex justify-content-between">
                          <span>{item} :</span>
                          <span className="ms-5">{valueArr[i]}</span>
                        </td>
                      ))
                    }
                  </tr>
                </tbody>
              </Table>

              <Table responsive>
                <thead>
                  <tr className="tr-font">
                    <th>User</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="d-flex flex-column">
                    {
                      keyArrUser && keyArrUser.map((item, i) => (
                        <td key={item} className="d-flex justify-content-between">
                          <span>{ item } :</span>
                          <span className="ms-5">{ valueArrUser[i] }</span>
                        </td>
                      ))
                    }
                  </tr>
                </tbody>
              </Table>
            </div>

          </div>
        </div>

      </Modal.Body>
    </Modal>
  )
}
CompsModalGetProfile.propTypes = {
  close: PropTypes.func.isRequired,
  data: PropTypes.shape().isRequired
}

export default CompsModalGetProfile

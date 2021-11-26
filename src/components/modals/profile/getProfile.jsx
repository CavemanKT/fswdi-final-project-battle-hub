import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

import useInvitation from '@/_hooks/invitation'
import useUser from '@/_hooks/user'
import withPrivateRoute from '@/_hocs/withPrivateRoute'

const CompsModalGetProfile = ({ data, close }) => {
  const { invitation, isLoading: isInvitationLoading, error: isInvitationErr, createInvitation } = useInvitation(data.id) // useSWR or axios
  const { user, isLoading: isUserLoaing, error: isUserErr } = useUser()

  const handleInvitationSubmit = (profileId, currentUserProfileId) => {
    createInvitation(currentUserProfileId).then(() => {

    })
  }

  // render challenge button status
  let invited = null
  invited = invitation ? invitation.invitation1 || invitation.invitation2 : null

  let myself = null
  myself = data.id === user.Profile.id

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
        {
          !invited && !myself && (
            <Button onClick={() => handleInvitationSubmit(data.id, user.Profile.id)} variant="outline-danger" className="ms-5">Challenge</Button>

          )
        }
        {
          invited && !myself && (
            <Button onClick={() => handleInvitationSubmit(data.id, user.Profile.id)} variant="outline-secondary" className="ms-5">Cancel</Button>

          )
        }

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

export default withPrivateRoute(CompsModalGetProfile)

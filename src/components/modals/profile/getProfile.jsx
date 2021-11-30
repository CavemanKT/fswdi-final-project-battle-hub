import React, { useRef, useState } from 'react'
import Overlay from 'react-bootstrap/Overlay'
import Popover from 'react-bootstrap/Popover'

import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

import useInvitation from '@/_hooks/invitation'
import useUser from '@/_hooks/user'
import withPrivateRoute from '@/_hocs/withPrivateRoute'

const CompsModalGetProfile = ({ data, close }) => {
  const { user, isLoading: isUserLoading, error: isUserErr } = useUser()

  const {
    invitation, isLoading: isInvitationLoading, error: isInvitationErr,
    createInvitation, destroyInvitation
  } = useInvitation(data.id) // useSWR or axios

  const [showBusyOrSuccess, setShowBusyOrSuccess] = useState(false)
  const [targetBusyOrSuccess, setTargetBusyOrSuccess] = useState(null)
  const refBusyOrSuccess = useRef(null)

  const [showSuccessReminder, setShowSuccessReminder] = useState(false)
  const [targetSuccessReminder, setTargetSuccessReminder] = useState(null)
  const refSuccessReminder = useRef(null)

  const handleInvitationSubmitBtn = (event) => {
    createInvitation().then((resp) => {
      if (!resp.opponentIsBusy) {
        setShowBusyOrSuccess(!showBusyOrSuccess)
        setTargetBusyOrSuccess(event.target)
      } else {
        setShowSuccessReminder(!showSuccessReminder)
        setTargetSuccessReminder(event.target)
      }
    })
  }

  const [show, setShow] = useState(false)
  const [target, setTarget] = useState(null)
  const ref = useRef(null)

  const handleInvitationCancelBtn = (event) => {
    destroyInvitation()
      .then((resp) => {
        if (!resp.data.invitation) {
          setShow(!show)
          setTarget(event.target)
        }
      })
  }

  if (isUserLoading || isInvitationLoading) return null

  // determine status of challenge button
  let invited = null
  invited = invitation ? invitation.invitation1 || invitation.invitation2 : null

  let myself = null
  myself = data.id === user.Profile.id

  // get rid of id, createdBy... atrributes
  const keyArr = Object.keys(data)
  const valueArr = Object.values(data)
  const userData = valueArr[13]

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
            <div ref={refBusyOrSuccess}>

              <Button
                onClick={handleInvitationSubmitBtn}
                variant="outline-danger"
                className="profile-modal-bar-cancel-btn"
              >
                Challenge
              </Button>
              <Overlay
                show={showBusyOrSuccess}
                target={targetBusyOrSuccess}
                placement="bottom"
                container={refBusyOrSuccess}
                containerPadding={20}
              >
                <Popover id="popover-contained">
                  <Popover.Header as="h3">Battling</Popover.Header>
                  <Popover.Body>
                    <strong>One of you has begun the battle.  We are waiting for the results.</strong>
                  </Popover.Body>
                </Popover>
                {/* {
                  showSuccessReminder && (
                  <Popover id="popover-contained">
                    <Popover.Header as="h3">Success</Popover.Header>
                    <Popover.Body>
                      <strong>Successfully invited.</strong>
                    </Popover.Body>
                  </Popover>
                  )
                } */}
              </Overlay>
              </div>
          )
        }
        {
          invited && !myself && (
            <div ref={ref}>
              <Button
                onClick={
                  handleInvitationCancelBtn
                }
                variant="outline-secondary"
                className="profile-modal-bar-cancel-btn"
              >Cancel</Button>

              <Overlay
                show={show}
                target={target}
                placement="bottom"
                container={ref}
                containerPadding={20}
                className="overlay-contained d-flex"
              >
                <Popover id="popover-contained">
                  <Popover.Header as="h3">Battling</Popover.Header>
                  <Popover.Body>
                    <p>This candidate has <strong>started</strong> the battle, it cannot be cancelled until there is a result</p>
                  </Popover.Body>
                </Popover>
              </Overlay>
              </div>
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

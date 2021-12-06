import React, { useRef, useState } from 'react'
import Overlay from 'react-bootstrap/Overlay'
import Popover from 'react-bootstrap/Popover'
import { Player } from 'video-react'
import Carousel from 'react-bootstrap/Carousel'
import Image from 'react-bootstrap/Image'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Head from 'next/head'

import useInvitation from '@/_hooks/invitation'
import useUser from '@/_hooks/user'
import withPrivateRoute from '@/_hocs/withPrivateRoute'

const CompsModalGetProfile = ({ data, close }) => {
  const { user, isLoading: isUserLoading, error: isUserErr } = useUser()

  console.log(data)
  const {
    invitation, isLoading: isInvitationLoading, error: isInvitationErr,
    createInvitation, destroyInvitation
  } = useInvitation(data.id) // useSWR or axios

  const [showBusyOrSuccess, setShowBusyOrSuccess] = useState(false)
  const [targetBusyOrSuccess, setTargetBusyOrSuccess] = useState(null)
  const refBusyOrSuccess = useRef(null)

  const handleInvitationSubmitBtn = (event) => {
    createInvitation().then((resp) => {
      setShowBusyOrSuccess(!showBusyOrSuccess)
      setTargetBusyOrSuccess(event.target)
    })
  }

  const [show, setShow] = useState(false)
  const [target, setTarget] = useState(null)
  const ref = useRef(null)

  const handleInvitationCancelBtn = (event) => {
    destroyInvitation()
      .then((resp) => {
        setShowBusyOrSuccess(false)
        setShow(false)

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
  console.log(keyArr, valueArr)
  keyArr.splice(0, 1)
  keyArr.splice(6, 10)
  valueArr.splice(0, 1)
  valueArr.splice(6, 10)

  return (
    <>
      <Head>
        <title>Profile</title>
        <link rel="stylesheet" href="/css/video-react.css" />
      </Head>

      <Modal fullscreen show onHide={close} className="modal-fullscreen wrapper d-flex">
        <Modal.Header closeButton className="d-flex">
          <Modal.Title>{data.characterName}&#39;s Profile</Modal.Title>

          {
          !invited && !myself && (
            <div className="header-wrapper">
              {
                data.id && (
                  <>
                    <Button
                      onClick={handleInvitationSubmitBtn}
                      variant="outline-danger"
                      className="profile-modal-bar-cancel-btn ms-3"
                    >
                      Challenge
                    </Button>

                      {
                        showBusyOrSuccess && (
                        <div className="text-danger ms-4 d-inline">
                          One of you has <strong>started</strong> the battle.  We are waiting for the results.

                        </div>

                        )
                      }

                  </>
                )
              }
              {
              !data.id && (
                <div className="d-flex ms-5 challenge-no-user-warning">
                  <div>Create your own profile to challange other opponents</div>
                </div>
              )
            }

              </div>
          )
          }
          {
          data.id && invited && !myself && (
            <div ref={ref}>
              {
              data.id && (
                <>
                  <Button
                    onClick={
                  handleInvitationCancelBtn
                }
                    variant="outline-secondary"
                    className="profile-modal-bar-cancel-btn ms-5"
                  >Cancel</Button>

                  {
                    show && (
                      <div className="d-inline text-danger ms-4">
                        This candidate has <strong>started</strong> the battle, it cannot be cancelled until there is a result
                      </div>
                    )
                  }

                </>
              )
            }
              {
              !data.id && (
                <div className="d-flex ms-5 challenge-no-user-warning">
                  <div>Create your own profile to challenge other opponents</div>
                </div>
              )
            }

              </div>
          )
        }

        </Modal.Header>

        <Modal.Body>

          <div id="profile-container" className="position-relative">

            <div className="profile-wrapper row">

              {/* video section */}
              <div className="left-column col d-flex justify-content-center align-items-center">
                {
                !data?.video && (
                  <div>
                    Candidate have not yet uploaded any video.
                  </div>
                )
              }
                {
                  data?.video && (
                  <Player
                    playsInline
                    poster="/assets/poster.png"
                    src={data?.video}
                    poster={data?.thumbnail}
                  />
                  )
                }
              </div>

              <div className="right-column col">
                {/* Characher info table */}
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

                {/* user info table */}
                <Table responsive>
                  <thead>
                    <tr className="tr-font">
                      <th>User</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="d-flex flex-column">
                      {
                        data.User && (
                          <>
                            <td className="d-flex justify-content-between">
                              <span>Name: </span>
                              <span className="ms-5">{ data.User.name }</span>
                            </td>
                            <td className="d-flex justify-content-between">
                              <span>Type: </span>
                              <span className="ms-5">{ data.User.type }</span>
                            </td>
                          </>
                        )
                    }
                    </tr>
                  </tbody>
                </Table>
              </div>

            </div>
          </div>

          <div className="carousel-container mt-3 d-flex justify-content-center align-items-center">
            <div id="showpage-carousel-container" className="fixed-the-size">
              {
                      !data?.img1 && !data?.img2 && !data?.img3 && (
                        <div>Candidate have not yet uploaded any image.</div>

                      )
                    }

              {
                      (data?.img1 || data?.img2 || data?.img3) && (
                      <Carousel variant="dark">
                        {
                    data?.img2 && (
                      <Carousel.Item className="showpage-carousel-item">
                        <Image
                          className="w-100"
                          src={data?.img1}
                          alt="Candidate forgot to upload the image"
                        />
                      </Carousel.Item>
                    )
                  }
                        {
                    data?.img2 && (
                      <Carousel.Item>
                        <Image
                          className="w-100"
                          src={data?.img2}
                          alt="Candidate forgot to upload the image"
                        />
                      </Carousel.Item>
                    )
                  }
                        {
                    data?.img3 && (
                      <Carousel.Item>
                        <Image
                          className="w-100"
                          src={data?.img3}
                          alt="Candidate forgot to upload the image"
                        />
                      </Carousel.Item>
                    )
                  }
                      </Carousel>
                      )
                    }

            </div>
          </div>

        </Modal.Body>
      </Modal>
    </>

  )
}
CompsModalGetProfile.propTypes = {
  close: PropTypes.func.isRequired,
  data: PropTypes.shape().isRequired
}

export default withPrivateRoute(CompsModalGetProfile)

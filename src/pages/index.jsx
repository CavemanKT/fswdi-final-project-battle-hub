/* eslint-disable @next/next/no-img-element */
// Comps
import Link from 'next/link'

// Hooks

import { useState, useRef } from 'react'

import Button from 'react-bootstrap/Button'
import Overlay from 'react-bootstrap/Overlay'
import Popover from 'react-bootstrap/Popover'
import useGames from '@/_hooks/games'
import useUser from '@/_hooks/user'
import useNotification from '@/_hooks/notification'

import CompsModalCreateProfile from '@/components/modals/profile/createProfile'
import CompsModalUserProfile from '@/components/modals/profile/getProfile'
import CompsLayout from '@/components/layouts/Layout'
import NewsletterSubscribe from '@/components/NewsletterSubscribe'

export default function PagesHome() {
  const [show, setShow] = useState(false)
  const [target, setTarget] = useState(null)
  const ref = useRef(null)

  const [openCreateProfileModal, setOpenCreateProfileModal] = useState(null)
  const [openMyProfileModal, setOpenMyProfileModal] = useState(null)

  const { user, apiProfileCreate, isLoading: isUserLoading } = useUser()
  // console.log(user)
  const { games, isLoading: isGamesLoading } = useGames()

  const {
    notifications, isLoading: isNotificationLoading,
    setInvitationStatusToAccepted,
    rejectInvitation,
    setInvitationResult
  } = useNotification(user)

  // console.log(notifications, candidates)
  if (isUserLoading || isGamesLoading) return null

  const index = games.data.findIndex((item) => item.title === 'Path of Exile')

  const handleCreateProfileModal = (gameId) => {
    setOpenCreateProfileModal(gameId)
  }

  const closeCreateProfileModal = () => {
    setOpenCreateProfileModal(null)
  }

  const handleMyProfileModal = (gameId) => { //  < ------ need a fix
    setOpenMyProfileModal(gameId)
  }

  const closeUserProfileModal = () => {
    setOpenMyProfileModal(null)
  }

  const handleSubmitProfileCreate = (values) => {
    apiProfileCreate(values).then(() => {
      setOpenCreateProfileModal(null)
    })
  }

  const handleInvitationStatus = (invitationOwnerProfileId, invitationId) => {
    setInvitationStatusToAccepted(invitationOwnerProfileId, invitationId)
  }

  const destroyInvitation = (invitationId) => {
    rejectInvitation(invitationId)
  }

  // notification drop down
  const handleClick = (event) => {
    setShow(!show)
    setTarget(event.target)
  }

  const setGameResult = (result, profileId, invitationId) => {
    setInvitationResult(result, profileId, invitationId)
  }

  return (
    <CompsLayout>
      <div className="home-page">
        <div className="d-flex home-page-row-wrapper">
          <div className="first-col-50" />
          <div className="second-col-50" />

          {/* navigation column */}
          <div className="navigation-section me-5 col-sm-1">
            <div className="navigation-selection-wrapper">
              <a href="#comps-layouts-navbar" className="triangle" id="upward-triangle" />
              <a href="#candidate-list" className="navigation-font" id="ranking">News</a>
              <a href="#game-list" className="navigation-font" id="games">Games</a>
              <a href="#footer" className="triangle" id="downward-triangle" />
            </div>
          </div>

          {/* candidate ranking column */}

          <div className="middle-section d-flex flex-column flex-grow-1 mb-5">
            <div id="candidate-list" className="m-5" />
          </div>

          {/* notification column */}
          <div ref={ref} className="notification-section">
            <Button onClick={handleClick} className="notification-toggle-btn btn btn-primary position-relative">Notifications

              {
                !user && null
              }
              {
                user && !isNotificationLoading && notifications?.invitation1 && notifications?.invitation2 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {
                    notifications.invitation1.length + notifications.invitation2.length
                  }
                </span>

                )
              }

            </Button>

            <Overlay
              show={show}
              target={target}
              placement="bottom"
              container={ref}
              containerPadding={20}
              className="notification-container"
            >
              <Popover id="popover-contained" className="pop-over-position position-absolute">

                {/* Please log in */}
                {
              !user && (
                <Popover.Body as="h3">Please <strong>log in</strong>.</Popover.Body>
              )
                }

                {/* Please create profile */}
                {
                  user && isNotificationLoading && (
                  <Popover.Body as="h3">In order to battle, please <strong>create your own profile</strong>.</Popover.Body>
                  )
                }

                {/* you as a receiver */}
                {
                  !isNotificationLoading && notifications && notifications?.invitation1.map((item) => (
                    <div key={item.id}>
                      <Popover.Header as="h3">Challenges</Popover.Header>
                      <Popover.Body>
                        {
                          item.status === 'pending' && (
                            <>
                              <p><strong>{`${item.OwnerProfile.characterName}`}</strong> from <strong>{` ${item.OwnerProfile.gameTitle}`}</strong> invite you for PVP.
                              </p>
                              <Button
                                className="ms-4 mt-1"
                                onClick={() => {
                                  handleInvitationStatus(item.OwnerProfile.id, item.id)
                                }}
                              >Accept</Button>
                              <Button className="ms-5 mt-1" onClick={() => destroyInvitation(item.id)}>Reject</Button>
                            </>
                          )
                        }

                        {/* when Receiver have not set the result after the match, it shows below's btn */}
                        {
                          item.status === 'accepted' && item.ReceiverProfile.id === user.Profile.id && item.result2 === null && (
                            <>
                              <p>
                                You cannot take challenge until the result comes out
                              </p>
                              <Button className="ms-2 mt-3" onClick={() => setGameResult('won', item.OwnerProfile.id, item.id)}>Won</Button>
                              <Button className="ms-2 mt-3" onClick={() => setGameResult('lost', item.OwnerProfile.id, item.id)}>Lost</Button>
                              <Button className="ms-2 mt-3" onClick={() => setGameResult('draw', item.OwnerProfile.id, item.id)}>Draw</Button>
                            </>
                          )
                        }

                        {/* when Receiver set the result, it shows.. */}
                        {
                          item.status === 'accepted' && item.ReceiverProfile.id === user.Profile.id && item.result2 && !item.result1 && (
                          <p>
                            Your result has been recorded, please wait for the opponent&#39;s result
                          </p>

                          )
                        }

                      </Popover.Body>
                    </div>
                  ))
                }

                {/* you as a sender */}
                {
                  !isNotificationLoading && notifications && notifications?.invitation2.map((item) => (
                    <div key={item?.id}>
                      <Popover.Header as="h3">Challenges</Popover.Header>
                      <Popover.Body>
                        {
                          item?.status === 'pending' && (
                            <p>
                              you have <strong>invited {`${item?.ReceiverProfile?.characterName}`}</strong> from <strong>{` ${item?.ReceiverProfile?.gameTitle}`}</strong> for PVP, please wait til the opponent accepts your challenge.
                            </p>
                          )
                        }

                        {/* OwnerProfile have not recorded the result, it shows below's btn */}
                        {
                          item?.status === 'accepted' && item?.OwnerProfile?.id === user.Profile.id && item.result1 === null && (
                            <>
                              <p>
                                You cannot take challenge until the result comes out
                              </p>
                              <Button className="ms-2 mt-3" onClick={() => setGameResult('won', item?.ReceiverProfile?.id, item?.id)}>Won</Button>
                              <Button className="ms-2 mt-3" onClick={() => setGameResult('lost', item?.ReceiverProfile?.id, item?.id)}>Lost</Button>
                              <Button className="ms-2 mt-3" onClick={() => setGameResult('draw', item?.ReceiverProfile?.id, item?.id)}>Draw</Button>
                              </>
                          )
                        }

                        {/* OwnerProfile have recorded the result, it shows... */}
                        {
                          item?.status === 'accepted' && item?.OwnerProfile?.id === user.Profile.id && item.result1 && !item.result2 && (
                          <p>
                            Your result has been recorded, please wait for the opponent&#39;s result
                          </p>
                          )
                        }

                      </Popover.Body>
                    </div>
                  ))
                }

                {/* neither */}
                {
                  !isNotificationLoading && !notifications?.invitation1[0]?.id && !notifications?.invitation2[0]?.id && (
                    <>
                      <Popover.Header as="h3">You have not been challenged yet.</Popover.Header>
                      <Popover.Body>
                        <strong>
                          Go invite others for a battle, so that you have higher chance to have PVP.
                        </strong>
                      </Popover.Body>
                    </>
                  )
                }

              </Popover>
            </Overlay>
          </div>
        </div>

        <div id="home-page-second-row-wrapper">

          {/* map the response and iterate the cards */}
          {games
            && (
            <div id="game-list" className="col-12 col-sm-8 col-md-6 col-lg-4 card-style m-5">
              <div className="card">
                <div>
                  <h3 className="text-center">Welcome!</h3>
                </div>
                <div>
                  <h6 className="text-center">Subscribe for more events</h6>
                </div>
                <div className="position-relative mb-3">
                  <NewsletterSubscribe />
                </div>
              </div>
              <div className="card">
                <img src={games && games.data[index].thumbnail} className="card-img-top" alt="Path_of_Exile_Image" />
                <div className="card-body">
                  <h5 className="card-title">{games && games.data[index].title}</h5>
                  <p className="card-text">{games && games.data[index].short_description}</p>
                </div>
                <ul className="list-group list-group-flush">

                  <li className="list-group-item d-flex justify-content-evenly">
                    <Link href={`/candidateList/${games && games.data[index].title}`}>
                      <a className="text-decoration-none">Candidate List</a>
                    </Link>

                    {// logged in and created profile
                        user && user.Profile
                        && (
                          <Link href="#">
                            <a className="text-decoration-none" onClick={() => handleMyProfileModal(games.data[index].id)}>Your Profile</a>
                          </Link>
                        )
                    }
                    {// logged in and didn't create profile
                        user && !user.Profile
                        && (
                          <Link href="#">
                            <a className="text-decoration-none" onClick={() => handleCreateProfileModal(games.data[index].id)}>Create Profile</a>
                          </Link>
                        )
                    }
                  </li>
                </ul>

                <div className="card-body d-flex justify-content-center">
                  <Link href="https://www.freetogame.com/open/path-of-exile">
                    <a className="card-link text-decoration-none">Official Website</a>
                  </Link>
                </div>

              </div>

            </div>
            )}

        </div>
        {
            openCreateProfileModal && (
              <CompsModalCreateProfile
                close={closeCreateProfileModal}
                onSubmit={handleSubmitProfileCreate}
                gameTitle={games && games.data[index].title}
              />
            )
          }
        {
            openMyProfileModal && (
              <CompsModalUserProfile
                close={closeUserProfileModal}
                data={user.Profile}
              />

            )
          }
      </div>

    </CompsLayout>
  )
}

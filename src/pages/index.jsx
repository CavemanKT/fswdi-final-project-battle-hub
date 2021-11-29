// Comps
import Link from 'next/link'

// Hooks

import { useState, useRef } from 'react'

import Button from 'react-bootstrap/Button'
import Overlay from 'react-bootstrap/Overlay'
import Popover from 'react-bootstrap/Popover'
import useGames from '@/_hooks/games'
import useUser from '@/_hooks/user'
import CompsModalCreateProfile from '@/components/modals/profile/createProfile'
import CompsLayout from '@/components/layouts/Layout'
import useNotification from '@/_hooks/notification'

export default function PagesHome() {
  const [show, setShow] = useState(false)
  const [target, setTarget] = useState(null)
  const ref = useRef(null)

  const [openCreateProfileModal, setOpenCreateProfileModal] = useState(null)

  const { user, apiProfileCreate, isLoading: isUserLoading } = useUser()
  const { games, isLoading: isGamesLoading } = useGames()
  const { notifications, isLoading: isNotificationLoading, setInvitationStatusToAccepted } = useNotification(user)

  if (isUserLoading || isGamesLoading) return null
  if (isNotificationLoading) return null
  const index = games.data.findIndex((item) => item.title === 'Path of Exile')

  const handleCreateProfileModal = (id) => {
    setOpenCreateProfileModal(id)
  }

  const closeCreateProfileModal = () => {
    setOpenCreateProfileModal(null)
  }

  const handleMyProfileModal = (id) => { //  < ------ need a fix

  }

  const handleSubmitProfileCreate = (values) => {
    apiProfileCreate(values).then(() => {
      setOpenCreateProfileModal(null)
    })
  }

  const handleInvitationStatus = (invitationId) => {
    setInvitationStatusToAccepted(invitationId)
  }

  // notification drop down
  const handleClick = (event) => {
    setShow(!show)
    setTarget(event.target)
  }

  return (
    <CompsLayout>
      <div className="home-page">
        <div className="d-flex home-page-row-wrapper">

          {/* navigation column */}
          <div className="navigation-section">
            <a href="#comps-layouts-navbar" className="triangle" id="upward-triangle" />
            <a href="#candidate-list" className="navigation-font" id="ranking">Ranking</a>
            <a href="#game-list" className="navigation-font" id="games">Games</a>
            <a href="#footer" className="triangle" id="downward-triangle" />
          </div>

          {/* candidate ranking column */}

          <div className="middle-section d-flex flex-column flex-grow-1">
            <div id="candidate-list">
              <ul>
                {/* todo: issue! */}
                {/* {candidates.forEach((item, i )=> {
                  <li key={i}>{item}</li>
                })} */}
              </ul>
            </div>

            {/* map the response and iterate the cards */}
            {games
            && (
            <div id="game-list" className="col-12 col-sm-6 col-md-4 col-lg-3 card-style">
              <div className="card">
                <img src={games && games.data[index].thumbnail} className="card-img-top" alt="Path_of_Exile_Image" />
                <div className="card-body">
                  <h5 className="card-title">{games && games.data[index].title}</h5>
                  <p className="card-text">{games && games.data[index].short_description}</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item ">
                    <Link href={`/candidateList/${games && games.data[index].title}`}>
                      <a className="text-decoration-none me-5">Candidate List</a>
                    </Link>
                    {// logined and didn't create profile
                        user && user.Profile
                        && (
                          <Link href="#">
                            <a className="text-decoration-none" onClick={() => handleMyProfileModal(games.data[index].id)}>Your Profile</a>
                          </Link>
                        )
                    }
                    {// logined and didn't create profile
                        user && !user.Profile
                        && (
                          <Link href="#">
                            <a className="text-decoration-none" onClick={() => handleCreateProfileModal(games.data[index].id)}>Create Profile</a>
                          </Link>
                        )
                    }
                  </li>

                </ul>

                <div className="card-body">
                  <Link href="https://www.freetogame.com/open/path-of-exile">
                    <a className="card-link text-decoration-none">Official Website</a>
                  </Link>
                </div>

              </div>

            </div>
            )}
          </div>

          {/* notification column */}
          <div ref={ref} className="notification-section">
            <Button onClick={handleClick} className="notification-toggle-btn">Holy guacamole!</Button>

            <Overlay
              show={show}
              target={target}
              placement="bottom"
              container={ref}
              containerPadding={20}
              className="notification-container"
            >
              <Popover id="popover-contained" className="pop-over-position">
                {

                  notifications && notifications.invitation1.map((item) => (
                    <div key={item.id}>
                      <Popover.Header as="h3">Popover bottom</Popover.Header>
                      <Popover.Body>
                        {
                          item.status === 'pending' && (
                          <p><strong>{`${item.OwnerProfile.characterName}`}</strong> from <strong>{` ${item.OwnerProfile.gameTitle}`}</strong> invite you for PVP.
                          </p>
                          )
                        }
                        {
                          item.status === 'accepted' && (
                            <p>
                              You can take challenge after the match
                            </p>
                          )
                        }
                        {/* accept --> status becomes accepted, reject --> delete the invitation */}
                        <Button className="ms-4 mt-4" onClick={() => handleInvitationStatus(item.OwnerProfile.id, item.id)}>Accept</Button>
                        <Button className="ms-5 mt-4" onClick={() => destroyInvitation(item.id)}>Reject</Button>
                      </Popover.Body>
                    </div>
                  ))
                }
                {
                  !notifications?.invitation1[0]?.id && (
                    <>
                      <Popover.Header as="h3">You have not been challenged yet.</Popover.Header>
                      <Popover.Body>
                        <strong>
                          Go challenge others, so that they will know you.
                        </strong>
                      </Popover.Body>
                    </>
                  )
                }

              </Popover>
            </Overlay>
          </div>
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
      </div>

    </CompsLayout>
  )
}

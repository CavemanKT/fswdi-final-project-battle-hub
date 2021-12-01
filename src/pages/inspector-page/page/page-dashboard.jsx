import { useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

import useInvitation from '@/_hooks/invitation'
import useGames from '@/_hooks/games'
import useCandidates from '@/_hooks/candidateList'
// import useHistory from '@/_hooks/history'
import CompsLayout from '@/components/layouts/Layout'

export default function pageDashBoard() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const { games, isLoading: isGamesLoading } = useGames()
  if (isGamesLoading) return null

  const index = games.data.findIndex((item) => item.title === 'Path of Exile')

  // const { candidates, isLoading } = useCandidates(gameTitle)
  // const {
  //   histories, isLoading: isHistoryLoading,
  //   getHistories,
  //   cancelHistory,
  //   setHistory // for now , here, we use timeStamp to identity which battle the candidate fought, so that we know which data is supposed to be modified.
  // } = useHistory()

  const handleGetList = (gameTitle) => {
    // getGameCandidateList()
  }

  return (

    <div id="inspector-dashBoard">
      <Button variant="animated-arrow" onClick={handleShow} className="me-2" />

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Games</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div onClick={() => handleGetList()} />

        </Offcanvas.Body>
      </Offcanvas>
      <div className="main-candidate-list" />
    </div>
  )
}

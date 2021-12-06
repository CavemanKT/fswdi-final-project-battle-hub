import { useRouter } from 'next/router'
import { useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Table from 'react-bootstrap/Table'
import Link from 'next/link'

import useUser from '@/_hooks/user'
import useGames from '@/_hooks/games'

import CompsModalGetHistory from '@/components/modals/history/get'

import withInspectorRoute from '@/_hocs/withInspectorRouter'

const PageDashBoard = () => {
  const router = useRouter()
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [candidateList, setCandidateList] = useState(null)
  const [historyData, setHistoryData] = useState(null)
  const [historyTarget, setHistoryTarget] = useState(null)
  const [historyOpenModal, setHistoryOpenModal] = useState(false)

  const { apiLogout } = useUser()

  const { games, isLoading: isGamesLoading,
    getGameCandidateList
  } = useGames()

  if (isGamesLoading) return null

  const index = games.data.findIndex((item) => item.title === 'Path of Exile')
  const gameTitle = games?.data[index].title
  const gameImg = games?.data[index].thumbnail

  const handleGetList = (game, page) => {
    getGameCandidateList(game, page).then((resp) => {
      setCandidateList(resp.data)
    })
  }

  const handleCandidateListHistoryModal = (i) => {
    setHistoryData(candidateList.candidateList[i])
    setHistoryTarget(i)
    setHistoryOpenModal(true)
  }

  // const closeModalsHistory = () => {
  //   setHistoryOpenModal(false)
  // }

  const handleInspectorLogout = () => {
    apiLogout().then(() => {
      router.push('/inspector-page/page/page-login')
    })
  }

  const profile = ['Game Title', 'Character Name', 'Weapon', 'Amulet', 'Armour', 'Boots', 'History']

  return (

    <div id="inspector-dash-board">
      <Button variant="animated-arrow" onClick={handleShow} className="me-2" />

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <div>
              Games
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {gameTitle && (
            <>
              <Image src={`${gameImg}`} alt="game_thumbnail" onClick={() => handleGetList(gameTitle)} />
              <Button onClick={() => handleGetList(gameTitle)} className="mt-3">{gameTitle}</Button>
            </>
          )}
          <div>
            <Button className="position-absolute fixed-bottom m-3 btn-danger" onClick={handleInspectorLogout}>Log out</Button>
          </div>

        </Offcanvas.Body>
      </Offcanvas>
      <div id="candidate-list-container" className="">

        {
              !candidateList && !candidateList?.candidateList && (
                <div className="text-center">
                  <h1>
                    Please select a game to view list of candidates
                  </h1>
                </div>
              )
            }
        {candidateList && (
        <>
          <div id="candidate-list-heading">
            <h3>Candidate List</h3>
          </div>

          <div className="candidate-list-wrapper">

            <Table responsive>
              <thead>
                <tr>
                  <th />
                  {
                  profile.map((item) => (
                    <th key={item}>{item}</th>
                  ))
                }
                </tr>
              </thead>
              <tbody>
                {
                candidateList && candidateList?.candidateList?.map((item, i) => (
                  <tr key={item.id}>
                    <td>{i + 1}</td>
                    <td>{item.gameTitle}</td>
                    <td>{item.characterName}</td>
                    <td>{item.weapon}</td>
                    <td>{item.amulet}</td>
                    <td>{item.armour}</td>
                    <td>{item.boots}</td>

                    <td className="d-flex justify-content-center">
                      <Link href={`/inspector-page/page/page-history/${item.id}`} passHref>
                        <a className="basic-btn-feature btn-history">History</a>
                        {/* <button type="button" className="basic-btn-feature btn-history" onClick={() => handleCandidateListHistoryModal(i)}>History</button> */}
                      </Link>
                    </td>
                  </tr>
                ))
              }
              </tbody>
            </Table>

          </div>

          <div className="pagination container d-flex justify-content-center">
            <div className="d-flex">
              <Button
                className="m-3"
                onClick={() => handleGetList(gameTitle, 1)}
                disabled={candidateList.filters.page === 1}
              >
                First Page
              </Button>
              <Button
                className="m-3"
                onClick={() => handleGetList(gameTitle, candidateList.filters.page - 1)}
                disabled={candidateList.filters.page <= 1}
              >
                PREV
              </Button>
              <Button
                className="m-3"
                onClick={() => handleGetList(gameTitle, candidateList.filters.page + 1)}
                disabled={candidateList.filters.page === candidateList.filters.totalPages}
              >
                NEXT
              </Button>
              <Button
                className="m-3"
                onClick={() => handleGetList(gameTitle, candidateList.filters.totalPages)}
                disabled={candidateList.filters.page === candidateList.filters.totalPages}
              >
                Last Page
              </Button>
            </div>

          </div>
        </>
        )}
      </div>

      {/* {
        historyOpenModal && (
          <div id="compsModalHistory">
            <CompsModalGetHistory
              candidateList={candidateList}
              data={historyData}
              target={historyTarget}
              close={closeModalsHistory}
            />
          </div>
        )
      } */}

    </div>
  )
}

export default withInspectorRoute(PageDashBoard)

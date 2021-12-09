import { useRouter } from 'next/router'
import { useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import useUser from '@/_hooks/user'
import useGames from '@/_hooks/games'
import useHistory from '@/_hooks/history'

import CompsModalGetWinRate from '@/components/modals/history/get'
import CompsModalHistoryList from '@/components/modals/history/getHistoryList'

import withInspectorRoute from '@/_hocs/withInspectorRouter'

const PageDashBoard = () => {
  const router = useRouter()
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [candidateList, setCandidateList] = useState(null)
  const [historyData, setHistoryData] = useState(null)
  const [historyTarget, setHistoryTarget] = useState(null)
  const [winRateOpenModal, setWinRateOpenModal] = useState(false)
  const [historyTableOpenModal, setHistoryTableOpenModal] = useState(false)
  const [historyList, setHistoryList] = useState(null)
  const [historySeasonChartData, setHistorySeasonChartData] = useState(null)

  const { apiLogout, apiProfileDestroy } = useUser()
  const { games, isLoading: isGamesLoading,
    getGameCandidateList
  } = useGames()

  const { apiProfileHistory } = useHistory()
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
    apiProfileHistory(candidateList.candidateList[i].id).then((resp) => {
      setHistorySeasonChartData(resp)
      setHistoryTarget(i)
      setWinRateOpenModal(true)
    })
  }

  const closeModalsWinRate = () => {
    setWinRateOpenModal(false)
  }

  const handleInspectorLogout = () => {
    apiLogout().then(() => {
      router.push('/inspector-page/page/page-login')
    })
  }

  const handleDeleteProfile = (i) => {
    apiProfileDestroy(candidateList.candidateList[i].id).then((resp) => {
      setCandidateList(resp.data)
    })
  }

  const handleShowHistory = (i) => {
    apiProfileHistory(candidateList.candidateList[i].id).then((resp) => {
      console.log(resp)
      setHistoryTableOpenModal(true)
      setHistoryList(resp.data)
    })
  }

  const closeModalsHistoryList = () => {
    setHistoryTableOpenModal(false)
  }

  const profile = ['', '', 'Character Name', 'Weapon', 'Amulet', 'Armour', 'Boots', '']

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

            <Table responsive className="candidate-list-secondary-wrapper">
              <Thead>
                <Tr>
                  <Th />
                  {
                  profile.map((item) => (
                    <Th key={item}>{item}</Th>
                  ))
                }
                </Tr>
              </Thead>
              <Tbody>
                {
                candidateList && candidateList?.candidateList?.map((item, i) => (
                  <Tr key={item.characterName}>
                    <Td className="d-flex justify-content-center border-bottom-0">
                      <button type="button" className="border-bottom-0 btn btn-danger" onClick={() => handleDeleteProfile(i)}>delete</button>
                    </Td>
                    <Td className="border-bottom-0" />
                    <Td className="d-flex justify-content-center border-bottom-0">
                      <button type="button" className="btn btn-info" onClick={() => handleShowHistory(i)}>History</button>
                    </Td>
                    <Td><p className="mt-3">{item.characterName}</p></Td>
                    <Td><p className="mt-3">{item.weapon}</p></Td>
                    <Td><p className="mt-3">{item.amulet}</p></Td>
                    <Td><p className="mt-3">{item.armour}</p></Td>
                    <Td><p className="mt-3">{item.boots}</p></Td>

                    <Td className="d-flex justify-content-center border-bottom-0">
                      <button type="button" className="basic-btn-feature btn-history" onClick={() => handleCandidateListHistoryModal(i)}>Win Rate</button>
                    </Td>
                  </Tr>
                ))
              }
              </Tbody>
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

      {
        historyTableOpenModal && (
          <div id="compsModalHistory">
            <CompsModalHistoryList
              data={historyList}
              close={closeModalsHistoryList}
            />
          </div>
        )
      }

      {
        winRateOpenModal && (
          <div id="compsModalWinRate">
            <CompsModalGetWinRate
              candidateList={candidateList}
              data={historyData}
              winRateData={historySeasonChartData}
              target={historyTarget}
              close={closeModalsWinRate}
            />
          </div>
        )
      }

    </div>
  )
}

export default withInspectorRoute(PageDashBoard)

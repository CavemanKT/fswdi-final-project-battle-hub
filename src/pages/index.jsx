//Comps
import CompsLayout from '@/components/layouts/Layout'
import CompsModalCandidateList from '@/components/modals/list/candidateList'
import CompsModalCreateProfile from '@/components/modals/profile/createProfile'

import Link from 'next/link'
import { useState } from 'react'

// Hooks
import useUser from '@/_hooks/user'
import useGames from '@/_hooks/games'

export default function PagesHome() {
  const arr = ['alksd G. klaflkds', 'alksd G. klaflkds', 'alksd G. klaflkds', 'alksd G. klaflkds', 'alksd G. klaflkds', 'alksd G. klaflkds', 'alksd G. klaflkds']
  const [ candidates, setCandidates ] = useState(arr)

  const { apiProfileCreate } = useUser()
  const { data } = useGames()

  const [ openCandidateListModal, setOpenCandidateListModal ] = useState(false)
  const [ openCreateProfileModal, setOpenCreateProfileModal ] = useState(false)

  function handleCandidateListModal(){
    setOpenCandidateListModal(true)
  }

  function closeCandidateListModal(){
    setOpenCandidateListModal(false)
  }

  function handleCreateProfileModal(){
    setOpenCreateProfileModal(true)
  }

  function closeCreateProfileModal(){
    setOpenCreateProfileModal(false)
  }

  function handleSubmitProfileCreate(values){
    apiProfileCreate(values).then(() => {
      setOpenCreateProfileModal(false)
    })
  }

  return (
    <CompsLayout>
      <div className="home-page">
        <div className="container">
          <div className="row">

{/* navigation column */}
            <div className="navigation-section" >
              <a href="#comps-layouts-navbar" className="triangle" id="upward-triangle"></a>
              <a href="#ranking-row" className="navigation-font" id="ranking">Ranking</a>
              <a href="#games-row" className="navigation-font" id="games">Games</a>
              <a href="#footer" className="triangle" id="downward-triangle"></a>
              <div id="split-bar"></div>
            </div>

{/* candidate ranking column */}
            <div className="col-12" id="ranking-row">
              <ul>
              {/* todo: issue! */}
                {candidates.forEach((item, i )=> {
                  <li key={i}>{item}</li>
                })}
              </ul>
            </div>
          </div>


{/* row: Game cards */}
          <div className="row mt-5" id="games-row">

            {/* map the response and iterate the cards */}
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 card-style">
              <div className="card">
                <img src="https://www.freetogame.com/g/226/thumbnail.jpg" className="card-img-top" alt="..."></img>
                {/* https://www.freetogame.com/api/games?platform=pc&category=mmorpg&sort-by=popularity */}
                  <div className="card-body">
                    <h5 className="card-title">asdf</h5>
                    <p className="card-text">me quick example text to build on the card title and make up the bulk of the card's content.</p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <Link href="#">
                        <a onClick={handleCandidateListModal}>Candidate List</a>
                      </Link>
                    </li>
                    <li className="list-group-item">
                      <Link href="#">
                          {/* () => handleCreateProfileModal(game.gameTitle) */}
                        <a onClick={handleCreateProfileModal}>Create Profile</a>
                      </Link>
                    </li>
                    <li className="list-group-item">A third item</li>
                  </ul>
                  <div className="card-body">
                    <Link href="https://www.freetogame.com/open/path-of-exile">
                      <a className="card-link">Card link</a>
                    </Link>
                    <Link href="https://www.freetogame.com/open/path-of-exile">
                      <a className="card-link">Card link</a>
                    </Link>
                  </div>
              </div>

            </div>
          </div>

          {
            openCandidateListModal && (
              <CompsModalCandidateList
                close={closeCandidateListModal}
                // onSubmit={}
              />
            )
          }
          {
            openCreateProfileModal && (
              <CompsModalCreateProfile
                close={closeCreateProfileModal}
                onSubmit={handleSubmitProfileCreate}
                gameTitle={'Path of Exile'}
              />
            )
          }
        </div>
      </div>

      {/* footer component */}
      <footer></footer>
    </CompsLayout>
  )
}

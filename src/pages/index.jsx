//Comps
import CompsLayout from '@/components/layouts/Layout'
import CompsModalCreateProfile from '@/components/modals/profile/createProfile'

import Link from 'next/link'
import { useState } from 'react'

// Hooks
import useUser from '@/_hooks/user'
import useGames from '@/_hooks/games'

export default function PagesHome() {
  // const arr = []
  // const [ candidates, setCandidates ] = useState(arr)

  const [ openCreateProfileModal, setOpenCreateProfileModal ] = useState(null)

  const { apiProfileCreate } = useUser()
  const { games } = useGames()

  let gameObj = games?.data[45]
  function handleCreateProfileModal(id){
    setOpenCreateProfileModal(id)
  }

  function closeCreateProfileModal(){
    setOpenCreateProfileModal(null)
  }

  function handleSubmitProfileCreate(values){
    apiProfileCreate(values).then(() => {
      setOpenCreateProfileModal(null)
    })
  }

  return (
    <>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <title>Battle Hub</title>
      </head>

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
              </div>

  {/* candidate ranking column */}
              <div className="col-12" id="ranking-row">
                <ul>
                {/* todo: issue! */}
                  {/* {candidates.forEach((item, i )=> {
                    <li key={i}>{item}</li>
                  })} */}
                </ul>
              </div>
            </div>


  {/* row: Game cards */}
            <div className="row" id="games-row">

              {/* map the response and iterate the cards */}
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 card-style">
                <div className="card">
                  <img src={games && gameObj.thumbnail} className="card-img-top" alt="Path_of_Exile_Image"></img>
                    <div className="card-body">
                      <h5 className="card-title">{games && gameObj.title}</h5>
                      <p className="card-text">{games && gameObj.short_description}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item ">
                        <Link href={`/${games&&gameObj.id}/candidateList`}>
                          <a className="text-decoration-none me-5">Candidate List</a>
                        </Link>
                        <Link href="#">
                          <a className="text-decoration-none" onClick={() => handleCreateProfileModal(games && gameObj.id)}>Create Profile</a>
                        </Link>
                      </li>

                    </ul>

                    <div className="card-body">
                      <Link href="https://www.freetogame.com/open/path-of-exile">
                        <a className="card-link text-decoration-none">Official Website</a>
                      </Link>
                    </div>

                </div>

              </div>
            </div>

            {
              openCreateProfileModal && (
                <CompsModalCreateProfile
                  close={closeCreateProfileModal}
                  onSubmit={handleSubmitProfileCreate}
                  gameTitle={games && gameObj.title}
                />
              )
            }
          </div>
        </div>

      </CompsLayout>
    </>
  )
}

import CompsLayout from '@/components/layouts/Layout'
import Link from 'next/link'
import { useState } from 'react'

export default function PagesHome() {
  const arr = ['alksd G. klaflkds', 'alksd G. klaflkds', 'alksd G. klaflkds', 'alksd G. klaflkds', 'alksd G. klaflkds', 'alksd G. klaflkds', 'alksd G. klaflkds']
  const [ candidates, setCandidates ] = useState(arr)


  // use axios to get the image link for card image
  // https://www.freetogame.com/api/games?platform=pc&category=mmorpg&sort-by=popularity
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


{/* Game cards */}
          <div className="row mt-5" id="games-row">
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 card-style">
      {/* map the response and iterate the cards */}
              <div className="card">
                <img src="https://www.freetogame.com/g/226/thumbnail.jpg" className="card-img-top" alt="..."></img>
                {/* https://www.freetogame.com/api/games?platform=pc&category=mmorpg&sort-by=popularity */}
            {/* width: 18rem; */}
                  <div className="card-body">
                    <h5 className="card-title">asdf</h5>
                    <p className="card-text">me quick example text to build on the card title and make up the bulk of the card's content.</p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">An item</li>
                    <li className="list-group-item">A second item</li>
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


        </div>
      </div>

{/* footer component */}
      <footer></footer>
    </CompsLayout>
  )
}

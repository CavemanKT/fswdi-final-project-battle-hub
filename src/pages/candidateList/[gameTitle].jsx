import { useState } from 'react'
import { useRouter } from 'next/router'

import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

// _hooks
import useCandidates from '@/_hooks/candidateList'

import CompsLayout from '@/components/layouts/Layout'

// import modal
import CompsModalGetProfile from '@/components/modals/profile/getProfile'

const profile = ['Game Title', 'Character Name', 'Weapon', 'Amulet', 'Armour', 'Boots', 'Profile']

export default function PageCandidateList() {
  const router = useRouter()
  const { query: { gameTitle } } = router
  const [page, setPage] = useState(1)
  const { candidates, isLoading } = useCandidates(gameTitle, page)

  // console.log(candidates)

  // modal state
  const [openProfileModal, setProfileOpenModal] = useState(false)

  // data state
  const [profileData, setProfileData] = useState(null)

  if (router.isFallback) return <div>Loading...</div>
  if (isLoading) return null

  const handleCandidateListProfileModal = (i) => {
    delete candidates.candidateList[i].Histories
    setProfileData(candidates.candidateList[i])
    setProfileOpenModal(true)
  }

  const closeModalsProfile = () => {
    setProfileOpenModal(false)
  }

  return (
    <CompsLayout className="container">
      <div id="candidate-list-container" className="row">
        <div id="candidate-list-heading">
          <h3>Candidate List</h3>
        </div>

        <div className="candidate-list-wrapper col col-lg-2 col-md-auto">
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
                candidates && candidates.candidateList.map((item, i) => (
                  <tr key={item.id}>
                    <td>{i + 1}</td>
                    <td>{item.gameTitle}</td>
                    <td>{item.characterName}</td>
                    <td>{item.weapon}</td>
                    <td>{item.amulet}</td>
                    <td>{item.armour}</td>
                    <td>{item.boots}</td>
                    <td className="d-flex justify-content-center">
                      <button type="button" className="basic-btn-feature btn-profile" onClick={() => handleCandidateListProfileModal(i)}>
                        Profile
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </div>
      </div>

      <div className="pagination container d-flex justify-content-center">
        <div className="d-flex">
          <Button
            className="m-3"
            onClick={() => setPage(1)}
            disabled={candidates.filters.page === 1}
          >
            First Page
          </Button>
          <Button
            className="m-3"
            onClick={() => setPage(candidates.filters.page - 1)}
            disabled={candidates.filters.page <= 1}
          >
            PREV
          </Button>
          <Button
            className="m-3"
            onClick={() => setPage(candidates.filters.page + 1)}
            disabled={candidates.filters.page === candidates.filters.totalPages}
          >
            NEXT
          </Button>
          <Button
            className="m-3"
            onClick={() => setPage(candidates.filters.totalPages)}
            disabled={candidates.filters.page === candidates.filters.totalPages}
          >
            Last Page
          </Button>
        </div>

      </div>

      {
        openProfileModal && (
          <div id="compsModalProfile">
            <CompsModalGetProfile
              data={profileData}
              close={closeModalsProfile}
            />
          </div>
        )
      }
    </CompsLayout>
  )
}

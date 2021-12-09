import { useState } from 'react'
import { useRouter } from 'next/router'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import Button from 'react-bootstrap/Button'

// _hooks
import useCandidates from '@/_hooks/candidateList'

import CompsLayout from '@/components/layouts/Layout'

// import modal
import CompsModalGetProfile from '@/components/modals/profile/getProfile'

const profile = ['Game Title', 'Character Name', 'Weapon', 'Amulet', 'Armour', 'Boots', '']

export default function PageCandidateList() {
  const router = useRouter()
  const { query: { gameTitle } } = router
  const [page, setPage] = useState(1)
  const { candidates, isLoading } = useCandidates(gameTitle, page)

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
          <Table responsive className="candidate-list-secondary-wrapper col-xl-12">
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
                candidates && candidates.candidateList.map((item, i) => (
                  <Tr key={item.id}>
                    <Td>{item.id}</Td>
                    <Td>{item.gameTitle}</Td>
                    <Td>{item.characterName}</Td>
                    <Td>{item.weapon}</Td>
                    <Td>{item.amulet}</Td>
                    <Td>{item.armour}</Td>
                    <Td>{item.boots}</Td>
                    <Td className="d-flex justify-content-center position-relative">
                      <button type="button" className="basic-btn-feature btn-profile" onClick={() => handleCandidateListProfileModal(i)}>
                        Profile
                      </button>
                    </Td>
                  </Tr>
                ))
              }
            </Tbody>
          </Table>
        </div>
      </div>

      <div className="pagination container d-flex justify-content-center">
        <div className="d-flex">
          <Button
            className="m-3"
            onClick={() => setPage(1)}
            disabled={candidates.filters.page <= 1}
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
            disabled={candidates.filters.page - 1 >= candidates.filters.totalPages}
          >
            NEXT
          </Button>
          <Button
            className="m-3"
            onClick={
              () => setPage(candidates.filters.totalPages + 1)
              }
            disabled={candidates.filters.page - 1 >= candidates.filters.totalPages}
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

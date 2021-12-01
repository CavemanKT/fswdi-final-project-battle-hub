import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

import Table from 'react-bootstrap/Table'

// _hooks
import useUser from '@/_hooks/user'
import useCandidates from '@/_hooks/candidateList'
import useInvitation from '@/_hooks/invitation'

import CompsLayout from '@/components/layouts/Layout'

// import modal
import CompsModalGetProfile from '@/components/modals/profile/getProfile'

const profile = ['Game Title', 'Character Name', 'Weapon', 'Amulet', 'Armour', 'Boots', 'Profile', 'History'] //

export default function PageCandidateList() {
  const router = useRouter()
  const { query: { gameTitle } } = router
  const { candidates, isLoading } = useCandidates(gameTitle)
  // const { invitation, isLoading: isInvitationLoading } = useInvitation(candidates)

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
    <CompsLayout>
      <div id="candidate-list-container">
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
                    <td><button type="button" className="basic-btn-feature btn-history">History</button></td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
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

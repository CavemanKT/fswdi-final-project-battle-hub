import CompsLayout from '@/components/layouts/Layout'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

import useUser from '@/_hooks/user'
import useCandidates from '@/_hooks/candidateList'

import Table from 'react-bootstrap/Table'

export default function PageCandidateList() {
  const profile = ['Game Title', 'Charcter Name', 'Weapon', 'Amulet', 'Armour', 'Boots', 'Profile', 'History']

  const { query: { gameTitle } } = useRouter()
  const router = useRouter()
  const { candidates, error } = useCandidates(gameTitle)
  if (router.isFallback) return <div>Loading...</div>

  return(
    <>
      <CompsLayout>
        <div id="candidate-list-container">
          <div id="candidate-list-heading">
            <h3>Candidate List</h3>
          </div>

          <div className="candidate-list-wrapper">
            <Table responsive>
              <thead>
                <tr>
                  <th></th>
                  {profile.map((item, i) => (
                    <th key={i}>{item}</th>

                  ))}
                </tr>
              </thead>
              <tbody>
                {candidates && candidates.candidateList.map((item, i) => {
                  return(
                    <tr>
                      <td>{i}</td>
                      <td>{item.gameTitle}</td>
                      <td>{item.characterName}</td>
                      <td>{item.weapon}</td>
                      <td>{item.amulet}</td>
                      <td>{item.armour}</td>
                      <td>{item.boots}</td>
                      <td><button type="button" className="basic-btn-feature btn-profile">Profile</button></td>
                      <td><button type="button" className="basic-btn-feature btn-history">History</button></td>
                    </tr>
                  )
                })}

              </tbody>
            </Table>
          </div>

        </div>
      </CompsLayout>
    </>
  )

}

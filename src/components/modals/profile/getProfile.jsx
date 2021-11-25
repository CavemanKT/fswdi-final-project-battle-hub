import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'


const CompsModalGetProfile = ({ data, close }) => (
  <Modal show onHide={close}>
    <Modal.Header closeButton>
      <Modal.Title>Character's Name</Modal.Title>
    </Modal.Header>
    <Modal.Body>
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
                      <td className="d-flex justify-content-center">
                        <button type="button" className="basic-btn-feature btn-profile" onClick={()=> handleCandidateListProfileModal(item.gameTitle, item.id, i)}>
                          Profile
                        </button>
                      </td>
                      <td><button type="button" className="basic-btn-feature btn-history">History</button></td>
                    </tr>
                  )
                })}

              </tbody>
            </Table>
          </div>

    </Modal.Body>
  </Modal>
)
CompsModalGetProfile.propTypes = {
  close: PropTypes.func.isRequired,
}

export default CompsModalGetProfile

import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'


const CompsModalGetProfile = ({ data, close }) => {

  const profile = ['Game Title', 'Character Name', 'Weapon', 'Amulet', 'Armour', 'Boots']

  const keyArr = Object.keys(data)
  const valueArr = Object.values(data)
  const userData = valueArr[13]
  keyArr.splice(0,1)
  keyArr.splice(6,7)
  valueArr.splice(0,1)
  valueArr.splice(6,7)


  return (
  <Modal fullscreen={true} show onHide={close} className="modal-fullscreen">
    <Modal.Header closeButton>
      <Modal.Title>Character's Name</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div id="profile-container" className="position-relative">




        <div className="profile-wrapper row">
          <div className="left-column col">

          </div>

          <div className="right-column col">
            <Table responsive>
              <thead>
                <tr>
                  Character
                </tr>
              </thead>
              <tbody>
                <tr className="d-flex flex-column">
                  {keyArr.map((item, i)=> {

                    return(
                      <td>{item}:<span className="ms-5">{valueArr[i]}</span></td>
                    )

                  })}
                </tr>
              </tbody>
            </Table>
          </div>

        </div>
      </div>

    </Modal.Body>
  </Modal>
  )
}
CompsModalGetProfile.propTypes = {
  close: PropTypes.func.isRequired,
  data: PropTypes.shape().isRequired
}

export default CompsModalGetProfile

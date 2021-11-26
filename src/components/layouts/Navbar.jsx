import Link from 'next/link'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

import { useState } from 'react'

import Image from 'next/image'
import Toast from 'react-bootstrap/Toast'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Overlay from 'react-bootstrap/Overlay'
import Popover from 'react-bootstrap/Popover'
import ModalsSignup from '@/components/modals/auth/signup'
import ModalsLogin from '@/components/modals/auth/login'

// img
import brandLogo from '../../public/assets/logo_transparent_1.png'

// user
import useUser from '@/_hooks/user'

export default function CompsLayoutsNavbar() {
  const [openSignupModal, setOpenSignupModal] = useState(false)
  const [openLoginModal, setOpenLoginModal] = useState(false)

  const { user, apiSignup, apiLogin, apiLogout } = useUser()

  const handleSignupModal = () => {
    setOpenSignupModal(true)
  }

  const closeModalsSignup = () => {
    setOpenSignupModal(false)
  }

  const handleSignupSubmit = (values) => {
    apiSignup(values).then(() => {
      setOpenSignupModal(false)
    })
  }

  const handleLoginModal = () => {
    setOpenLoginModal(true)
  }

  const closeModalsLogin = () => {
    setOpenLoginModal(false)
  }

  const handleLoginSubmit = (values) => {
    apiLogin(values).then(() => {
      setOpenLoginModal(false)
    })
  }

  const handleLogout = () => {
    apiLogout()
  }

  const [showA, setShowA] = useState(true)
  const toggleShowA = () => setShowA(!showA)

  return (
    <>
      <Navbar id="comps-layouts-navbar" bg="light" expand="lg">
        <Container>
          <Image src={brandLogo} alt="brand-logo" width="64" height="64" />
          <span>
            <div>
              <Navbar.Brand as={Link} href="/"><a className="navbar-brand font-color">Battle</a></Navbar.Brand>
            </div>
            <div>
              <Navbar.Brand as={Link} href="/"><a className="navbar-brand font-color">Hub</a></Navbar.Brand>
            </div>
          </span>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} href="/private"><a className="nav-link">Private</a></Nav.Link>
              <Nav.Link as={Link} href="/blog"><a className="nav-link">Blog</a></Nav.Link>

              { !user
              && (
                <>
                  <Nav.Link className="" onClick={() => handleSignupModal()}>Sign up</Nav.Link>
                  <Nav.Link className="" onClick={() => handleLoginModal()}>Log in</Nav.Link>
                </>
              )}
              {
              user && (
                <>
                  <Nav.Link className="" onClick={handleLogout}>Log out</Nav.Link>
                  {/* <Col md={6} className="mb-2">
                    <Button onClick={toggleShowA} className="mb-2">
                      Toggle Toast <strong>with</strong> Animation
                    </Button>
                    <Overlay
                      show={showA}
                      target={target}
                      placement="bottom"
                      container={ref}
                      containerPadding={20}
                      onClose={toggleShowA}
                    >

                      <Toast show={showA} >
                      <Toast.Header>
                        <img
                          src="holder.js/20x20?text=%20"
                          className="rounded me-2"
                          alt=""
                        />
                        <strong className="me-auto">Bootstrap</strong>
                        <small>11 mins ago</small>
                      </Toast.Header>
                      <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
                    </Toast>

                    </Overlay>
                  </Col> */}
                </>
              )
            }

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {openSignupModal && <ModalsSignup close={closeModalsSignup} onSubmit={handleSignupSubmit} />}
      {openLoginModal && <ModalsLogin close={closeModalsLogin} onSubmit={handleLoginSubmit} />}
    </>
  )
}

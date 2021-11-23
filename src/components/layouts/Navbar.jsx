import Link from 'next/link'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

import { useState } from 'react'

import ModalsSignup from '@/components/modals/auth/signup'
import ModalsLogin from '@/components/modals/auth/login'

// img
import Image from 'next/image'
import brandLogo from '../../public/assets/logo_transparent_1.png'

// user
import useUser from '@/_hooks/user'


export default function CompsLayoutsNavbar() {
  const [ openSignupModal, setOpenSignupModal ] = useState(false)
  const [ openLoginModal, setOpenLoginModal ] = useState(false)

  const { user, apiSignup, apiLogin, apiLogout } = useUser()

  function handleSignupModal() {
    setOpenSignupModal(true)
  }

  function closeModalsSignup() {
    setOpenSignupModal(false)
  }

  function handleSignupSubmit(values){
    apiSignup(values).then(() => {
      setOpenSignupModal(false)
    })
  }

  function handleLoginModal() {
    setOpenLoginModal(true)
  }

  function closeModalsLogin() {
    setOpenLoginModal(false)
  }

  function handleLoginSubmit(values){
    apiLogin(values).then(() => {
      setOpenLoginModal(false)
    })
  }

  function handleLogout() {
    apiLogout()
  }

  return (
    <>
    <Navbar id="comps-layouts-navbar" bg="light" expand="lg">
      <Container>
        <Image src={brandLogo} alt="brand-logo" width="64" height="64"/>
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

            { !user ?
              (
                <>
                  <Nav.Link className="" onClick={() => handleSignupModal()}>Sign up</Nav.Link>
                  <Nav.Link className="" onClick={() => handleLoginModal()}>Log in</Nav.Link>
                </>
              ) : (
                <Nav.Link className="" onClick={handleLogout}>Log out</Nav.Link>
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

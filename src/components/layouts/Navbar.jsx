import Link from 'next/link'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

export default function CompsLayoutsNavbar() {
  return (
    <Navbar id="comps-layouts-navbar" bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} href="/"><a className="navbar-brand">Next Starter</a></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/private"><a className="nav-link">Private</a></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

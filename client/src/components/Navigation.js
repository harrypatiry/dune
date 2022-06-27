import React from 'react'
import { useSelector } from 'react-redux'
import { Nav, NavDropdown, Container, Navbar, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useLogoutUserMutation } from '../services/appApi'

export default function Navigation() {
  const {user } = useSelector((state) => state.user)
  const [logoutUser] = useLogoutUserMutation()
  const handleLogout = () => {
    logoutUser().then(({err}) =>{
      if(!err) {
        console.log('logged out')
      }
    })
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>DUNE</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
              <LinkContainer to='/'>
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              {!user && <LinkContainer to='/login'>
                <Nav.Link className="btn btn-dark text-white">Login</Nav.Link>
              </LinkContainer>}
              {user  && (<NavDropdown title={user.email} id="basic-nav-dropdown">
                <LinkContainer to='/new-article'>
                  <NavDropdown.Item>New Article</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/articles/me'>
                  <NavDropdown.Item>My Articles</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Button onClick={handleLogout} variant="outline-dark">Logout</Button>
                </NavDropdown.Item>
              </NavDropdown>
              )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

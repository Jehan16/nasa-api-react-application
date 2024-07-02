import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Nasa() {
  function handleLogOut() {
    localStorage.removeItem('token')
    window.location.reload()
  }

  return (
    <Navbar bg="dark" data-bs-theme="dark" fixed="top">
      <Container>
        <Navbar.Brand href="/">NASA</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
        </Nav>
        <Nav className="ms-auto">
          <button className='logoutButton' onClick={handleLogOut}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        </Nav>
      </Container>
    </Navbar>
  );
}
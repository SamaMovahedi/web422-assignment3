import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';

export default function MainNav() {
  return (
    <>
      <Navbar fixed="top" className="navbar-dark bg-dark py-2">
        <Container>
          <Navbar.Brand as={Link} href="/">
            Sama Movahedi
          </Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link as={Link} href="/about">
              About
            </Nav.Link>

            <Nav.Link as={Link} href="/favourites">
              Favourites
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <br />
      <br />
    </>
  );
}
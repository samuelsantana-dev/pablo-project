import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

export function Header() {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
          Sistema de Gestão
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/login" className="px-3 text-white">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/" className="px-3 text-white">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/gestao-pacientes" className="px-3 text-white">
              Gestão de Pacientes
            </Nav.Link>
            <Nav.Link as={Link} to="/cadastro-paciente" className="px-3 text-white">
              Cadastrar Paciente
            </Nav.Link>
            <Nav.Link as={Link} to="/laudo-sarcopenia" className="px-3 text-white">
              Avaliação de Sarcopenia
            </Nav.Link>
            <Nav.Link as={Link} to="/sarc-form" className="px-3 text-white">
              Avaliação Formulario
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

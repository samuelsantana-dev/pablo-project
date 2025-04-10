import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FaHome, FaUserPlus, FaSignInAlt, FaUserFriends, FaClipboardList, FaFileAlt, FaSignOutAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export function Header() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    console.log('loggedInUser', loggedInUser);
    if (loggedInUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("user");
    localStorage.removeItem("userFormData");
    setIsLoggedIn(false);
    navigate("/login");
  }

  
  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="shadow-sm mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 text-info">
          🏥 Sistema de Gestão
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center gap-2">
            <Nav.Link as={Link} to="/" className="d-flex align-items-center gap-1 text-white">
              <FaHome /> Home
            </Nav.Link>

            <Nav.Link as={Link} to="/cadastro-paciente" className="d-flex align-items-center gap-1 text-white">
                <FaUserPlus /> Cadastro
              </Nav.Link>
            {
              isLoggedIn && (
                <Nav.Link as={Link} to="/gestao-pacientes" className="d-flex align-items-center gap-1 text-white">
                  <FaUserFriends /> Gestão de Pacientes
                </Nav.Link>
              )
            }
            <Nav.Link as={Link} to="/laudo-sarcopenia" className="d-flex align-items-center gap-1 text-white">
              <FaClipboardList /> Avaliação de Sarcopenia
            </Nav.Link>
            <Nav.Link as={Link} to="/sarc-form" className="d-flex align-items-center gap-1 text-white">
              <FaFileAlt /> SARC-FORM
            </Nav.Link>

            <Nav.Link as={Link} to="/login">
                <Button variant="outline-info" className="d-flex align-items-center gap-2">
                  <FaSignInAlt /> Login
                </Button>
              </Nav.Link>
            {
              isLoggedIn && (
                    <Button variant="outline-danger" onClick={handleLogout} className="d-flex align-items-center gap-2">
                      <FaSignOutAlt /> Sair
                    </Button>
              )
            }
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

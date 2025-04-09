import { useState, useEffect } from "react";
import { Container, Button, Card, Spinner, Form, Image } from "react-bootstrap";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/logo.png";
import "./login.css";

export function Login() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showWelcome) {
    return (
      <Container className="vh-100 d-flex flex-column justify-content-center align-items-center bg-welcome animate-fade-in">
        <Image src={logo} alt="Logo" width={100} className="mb-4 animate-pop-in" />
        <h1 className="text-primary fw-bold animate-slide-up">Bem-vindo ao Sistema!</h1>
        <Spinner animation="border" variant="primary" className="mt-3" />
      </Container>
    );
  }

  return (
    <Container fluid className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-login p-3 animate-fade-in">
      <Image src={logo} alt="Logo" width={80} className="mb-4" />

      <Card className="p-4 shadow-lg text-center w-100 mb-4 login-card">
        <Card.Body>
          <Card.Title className="fs-3 fw-bold text-primary">Sobre o Projeto</Card.Title>
          <Card.Text className="text-muted">
            Sistema para cadastro e gestão de pacientes, com emissão de Avaliação de sarcopenia.
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="p-4 shadow-lg w-100 login-card">
        <Card.Body>
          <Card.Title className="fs-4 fw-bold text-primary text-center mb-4">Login</Card.Title>
          <Form>
            <Form.Group className="mb-3 d-flex align-items-center input-group-custom" controlId="formName">
              <FaUser className="me-2 icon-lg text-secondary" />
              <Form.Control type="text" placeholder="Digite seu nome" />
            </Form.Group>
            <Form.Group className="mb-3 d-flex align-items-center input-group-custom" controlId="formEmail">
              <FaEnvelope className="me-2 icon-lg text-secondary" />
              <Form.Control type="email" placeholder="Digite seu email" />
            </Form.Group>
            <Form.Group className="mb-4 d-flex align-items-center input-group-custom" controlId="formPhone">
              <FaPhone className="me-2 icon-lg text-secondary" />
              <Form.Control type="text" placeholder="Digite seu telefone" />
            </Form.Group>
            <div className="d-grid">
              <Button variant="primary" type="submit">Cadastrar</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

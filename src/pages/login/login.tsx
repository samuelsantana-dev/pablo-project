// import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Button, Card, Spinner, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export function Login() {
//   const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showWelcome) {
    return (
      <Container className="d-flex vh-100 justify-content-center align-items-center bg-light">
        <h1 className="text-primary fw-bold">Bem-vindo ao Sistema!</h1>
        <Spinner animation="border" variant="primary" className="ms-3" />
      </Container>
    );
  }

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <Card className="p-4 shadow-lg text-center w-50 mb-4">
        <Card.Body>
          <Card.Title className="fs-3 fw-bold text-primary">Sobre o Projeto</Card.Title>
          <Card.Text className="text-muted">
            Este sistema foi desenvolvido para auxiliar no cadastro e gestão de pacientes, fornecendo também suporte para emissão de laudos de sarcopenia.
          </Card.Text>
        </Card.Body>
      </Card>
      
      <Card className="p-4 shadow-lg w-50">
        <Card.Body>
          <Card.Title className="fs-4 fw-bold text-primary text-center">Login</Card.Title>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Nome Completo</Form.Label>
              <Form.Control type="text" placeholder="Digite seu nome" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Digite seu email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Telefone</Form.Label>
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

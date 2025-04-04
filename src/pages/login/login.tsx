import { useState, useEffect } from "react";
import {
  Container,
  Button,
  Card,
  Spinner,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export function Login() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showWelcome) {
    return (
      <Container className="d-flex vh-100 justify-content-center align-items-center bg-primary text-white">
        <div className="text-center">
          <h1 className="fw-bold mb-3 animate__animated animate__fadeInDown">
            Bem-vindo ao Sistema!
          </h1>
          <Spinner animation="border" variant="light" />
        </div>
      </Container>
    );
  }

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light px-3">
      <Row className="w-100" style={{ maxWidth: "900px" }}>
        <Col md={6} className="mb-4 mb-md-0">
          <Card className="p-4 shadow-sm h-100">
            <Card.Body>
              <Card.Title className="fs-3 fw-bold text-primary">
                Sobre o Projeto
              </Card.Title>
              <Card.Text className="text-muted mt-3">
                Interface para avaliação do risco de sarcopenia em pessoas
                idosas.
              </Card.Text>
              <Card.Text className="text-muted">
                Rastreie a saúde muscular de forma eficiente e simplificada.
              </Card.Text>
              <Card.Text className="text-muted fst-italic small mt-4">
                Preencha os dados ao lado para iniciar a avaliação.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="p-4 shadow-sm">
            <Card.Body>
              <Card.Title className="fs-4 fw-bold text-center text-primary mb-4">
                Acesso Rápido
              </Card.Title>
              <Form>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Nome Completo</Form.Label>
                  <Form.Control type="text" placeholder="Digite seu nome" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Digite seu email" />
                </Form.Group>
                <Form.Group className="mb-4" controlId="formPhone">
                  <Form.Label>Telefone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digite seu telefone"
                  />
                </Form.Group>
                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    Iniciar Avaliação
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

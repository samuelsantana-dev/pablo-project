import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Button, Card, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export function Home() {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showWelcome) {
    return (
      <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
        <h1 className="text-primary">Bem-vindo ao SaRCTesT</h1>
        <p className="text-muted">Carregando...</p>
        <Spinner animation="border" role="status" />
      </Container>
    );
  } 

  return (
    <Container className="mt-5">
      <Card className="p-4 text-center shadow">
        <Card.Body>
          <h2>Escolha uma opção:</h2>
          <div className="d-grid gap-2 mt-3">
            <Button variant="primary" size="lg" onClick={() => navigate("/cadastro-paciente")}>
              Cadastro de Pacientes
            </Button>
            <Button variant="success" size="lg" onClick={() => navigate("/gestao-pacientes")}>
              Gestão de Pacientes
            </Button>
            <Button variant="warning" size="lg" onClick={() => navigate("/laudo-sarcopenia")}>
              Avaliação de Sarcopenia
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

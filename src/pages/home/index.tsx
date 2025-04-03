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
<<<<<<< HEAD
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Bem-vindo ao SaRCTesT</h1>
        <p>Escolha uma opção:</p>
        <button onClick={() => navigate("/cadastro-paciente")}>Cadastro de Pacientes</button>
        <button onClick={() => navigate("/gestao-pacientes")}>Gestão de Pacientes</button>
        <button onClick={() => navigate("/laudo-sarcopenia")}>Avaliação de Sarcopenia</button>
      </div>
    );
  }
=======
      <Container className="d-flex vh-100 justify-content-center align-items-center bg-light">
        <h1 className="text-primary fw-bold">Bem-vindo ao Sistema!</h1>
        <Spinner animation="border" variant="primary" className="ms-3" />
      </Container>
    );
  }

  return (
    <Container className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <Card className="p-4 shadow-lg text-center w-50">
        <Card.Body>
          <Card.Title className="fs-3 fw-bold text-primary">Bem-vindo ao Sistema</Card.Title>
          <Card.Text className="text-muted">Escolha uma opção:</Card.Text>
          <div className="d-grid gap-3">
            <Button variant="primary" size="lg" onClick={() => navigate("/cadastro-paciente")}>Cadastro de Pacientes</Button>
            <Button variant="success" size="lg" onClick={() => navigate("/gestao-pacientes")}>Gestão de Pacientes</Button>
            <Button variant="warning" size="lg" onClick={() => navigate("/laudo-sarcopenia")}>Laudo de Sarcopenia</Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
>>>>>>> 46727ad (Nova pagina de login e home e atualizações de paginas)

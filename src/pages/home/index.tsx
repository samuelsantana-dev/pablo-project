import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Button, Card, Spinner } from "react-bootstrap";
import { motion } from "framer-motion"; // <-- novo
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/home.css"; // <-- mantém seu CSS

export function Home() {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showWelcome) {
    return (
      <motion.div
        className="d-flex flex-column justify-content-center align-items-center vh-100 bg-gradient-pixeon text-white"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Bem-vindo ao SaRCTesT
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Carregando...
        </motion.p>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Spinner animation="border" role="status" variant="light" />
        </motion.div>
      </motion.div>
    );
  } 

  return (
    <div className="home-container bg-gradient-pixeon text-white">
      <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100">
        <Card className="home-card text-center shadow-lg">
          <Card.Body>
            <h2 className="mb-4">Escolha uma opção:</h2>
            <div className="d-grid gap-3">
              <Button
                variant="light"
                size="lg"
                className="btn-custom"
                onClick={() => navigate("/cadastro-paciente")}
              >
                Cadastro de Pacientes
              </Button>
              <Button
                variant="light"
                size="lg"
                className="btn-custom"
                onClick={() => navigate("/gestao-pacientes")}
              >
                Gestão de Pacientes
              </Button>
              <Button
                variant="light"
                size="lg"
                className="btn-custom"
                onClick={() => navigate("/laudo-sarcopenia")}
              >
                Avaliação de Sarcopenia
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

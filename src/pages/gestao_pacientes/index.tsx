import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ListGroup,
} from 'react-bootstrap';
import './PatientManagement.css';

export function PatientManagement() {
  const [searchName, setSearchName] = useState('');
  const [searchCpf, setSearchCpf] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]); // Altere o tipo conforme necessário

  const handleSearch = () => {
    // Aqui você adicionaria a lógica para pesquisar pacientes
    // e atualizar searchResults com os resultados.
    // Exemplo simulado:
    const results = [`Resultado para ${searchName} e ${searchCpf}`];
    setSearchResults(results);
  };

  return (
    <Container className="mt-4">
      <header className="text-center mb-4">
        <h1>Gestão de Pacientes</h1>
      </header>
      <main>
        <section id="search-patient" className="mb-4">
          <h2>Pesquisar Paciente</h2>
          <Form id="search-form">
            <Form.Group>
              <Form.Label htmlFor="search-name">Nome:</Form.Label>
              <Form.Control
                type="text"
                id="search-name"
                placeholder="Digite o nome do paciente..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="search-cpf">CPF:</Form.Label>
              <Form.Control
                type="text"
                id="search-cpf"
                placeholder="Digite o CPF..."
                value={searchCpf}
                onChange={(e) => setSearchCpf(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" id="search-button" onClick={handleSearch}>
              Pesquisar
            </Button>
          </Form>
          <ListGroup id="search-results" className="mt-3">
            {searchResults.map((result, index) => (
              <ListGroup.Item key={index}>{result}</ListGroup.Item>
            ))}
          </ListGroup>
        </section>
        <section id="add-patient" className="mb-4 text-center">
          <Button
            variant="success"
            id="add-patient-btn"
            onClick={() => (window.location.href = 'cadastro_paciente.html')}
          >
            ➕ Cadastrar Paciente
          </Button>
        </section>
        <section className="text-center">
          <Button
            variant="info"
            onClick={() => (window.location.href = 'avaliacao_sarcopenia.html')}
          >
            Avaliação de Sarcopenia
          </Button>
        </section>
      </main>
    </Container>
  );
}

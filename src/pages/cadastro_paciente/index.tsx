import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import '../../styles.css';

export function RegistrationPatient() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  useEffect(() => {
    const savedData = localStorage.getItem('userFormData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setName(parsedData.name || '');
      setEmail(parsedData.email || '');
      setPhone(parsedData.phone || '');
      setBirthdate(parsedData.birthdate || '');
      setHeight(parsedData.height || '');
      setWeight(parsedData.weight || '');
    }
  }, []);

  useEffect(() => {
    const formData = { name, email, phone, birthdate, height, weight };
    localStorage.setItem('userFormData', JSON.stringify(formData));
  }, [name, email, phone, birthdate, height, weight]);

  useEffect(() => {
    if (birthdate) {
      setAge(calculateAge(birthdate).toString());
    } else {
      setAge('');
    }
  }, [birthdate]);

  const calculateAge = (birthdate: string): number => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const data = { name, email, phone, birthdate, age, height, weight };
    console.log(data);
    alert('Formulário enviado com sucesso!');
    handleReset();
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setBirthdate('');
    setAge('');
    setHeight('');
    setWeight('');
    localStorage.removeItem('userFormData');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Form
        onSubmit={handleSubmit}
        className="w-75 p-5 bg-white shadow-lg rounded border border-0 form-container"
      >
        <h2 className="text-center mb-4 text-primary">Cadastro de Paciente</h2>

        <Row className="mb-4">
          <Col md={6}>
            <Form.Group controlId="name">
              <Form.Label className="form-label">Nome:</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite o nome completo"
                required
                className="input-field"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label className="form-label">E-mail:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail"
                required
                className="input-field"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
            <Form.Group controlId="phone">
              <Form.Label className="form-label">Telefone:</Form.Label>
              <Form.Control
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Digite o telefone"
                required
                className="input-field"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="birthdate">
              <Form.Label className="form-label">Data de Nascimento:</Form.Label>
              <Form.Control
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                placeholder="dd/mm/aaaa"
                required
                className="input-field"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
            <Form.Group controlId="age">
              <Form.Label className="form-label">Idade:</Form.Label>
              <Form.Control
                type="text"
                value={age}
                readOnly
                placeholder="Idade calculada automaticamente"
                className="input-field"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="height">
              <Form.Label className="form-label">Altura (cm):</Form.Label>
              <Form.Control
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Altura em cm"
                className="input-field"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
            <Form.Group controlId="weight">
              <Form.Label className="form-label">Peso (kg):</Form.Label>
              <Form.Control
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Peso em kg"
                className="input-field"
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-between mt-3">
          <Button type="submit" variant="primary" className="w-48 custom-btn">
            Enviar
          </Button>
          <Button
            type="button"
            onClick={handleReset}
            variant="outline-secondary"
            className="w-48 custom-btn-reset"
          >
            Redefinir
          </Button>
        </div>
      </Form>
    </Container>
  );
}
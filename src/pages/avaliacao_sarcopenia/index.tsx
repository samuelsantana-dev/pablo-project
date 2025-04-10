import { useState } from 'react';
import {
  Container,
  Form,
  Button,
  Alert,
  Card,
  Row,
  Col,
} from 'react-bootstrap';
import { InterfaceRegistration } from '../../types';

export function SarcopeniaAssessment() {
  const [forcaPreensao, setForcaPreensao] = useState<number | undefined>();
  const [tug, setTug] = useState<number | undefined>();
  const [anguloDeFase, setAnguloDeFase] = useState<number | undefined>();
  const [sentarLevantar, setSentarLevantar] = useState<number | undefined>();
  const [panturrilha, setPanturrilha] = useState<number | undefined>();
  const [sexo, setSexo] = useState('Masculino');
  const [laudo, setLaudo] = useState<any>(null);

  const gerarLaudo = () => {
    if (
      forcaPreensao === undefined ||
      tug === undefined ||
      anguloDeFase === undefined ||
      sentarLevantar === undefined ||
      panturrilha === undefined
    ) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const criterios: string[] = [];

    // Preensão Manual
    if ((sexo === 'Masculino' && forcaPreensao < 27) || (sexo === 'Feminino' && forcaPreensao < 16)) {
      criterios.push(`Força de preensão de ${forcaPreensao} kgf abaixo do valor de referência. Sugestivo de sarcopenia.`);
    } else {
      criterios.push(`Força de preensão de ${forcaPreensao} kgf dentro da normalidade.`);
    }

    // TUG
    if (tug <= 19) {
      criterios.push(`Tempo de TUG (${tug} s) dentro do esperado.`);
    } else if (tug <= 20) {
      criterios.push(`Tempo de TUG (${tug} s) acima do recomendado. Risco aumentado de sarcopenia.`);
    } else {
      criterios.push(`Tempo de TUG (${tug} s) elevado. Avaliação funcional comprometida.`);
    }

    // Sentar e Levantar
    if (sentarLevantar > 15) {
      criterios.push(`Tempo para sentar e levantar (${sentarLevantar} s) acima do recomendado. Possível fraqueza muscular e sarcopenia.`);
    } else {
      criterios.push(`Tempo para sentar e levantar (${sentarLevantar} s) dentro do esperado.`);
    }

    // Circunferência da Panturrilha
    if (panturrilha < 31) {
      criterios.push(`Circunferência da panturrilha (${panturrilha} cm) abaixo do recomendado.`);
    } else {
      criterios.push(`Circunferência da panturrilha (${panturrilha} cm) dentro da normalidade.`);
    }

    // Ângulo de Fase
    if (anguloDeFase > 5.25) {
      criterios.push(`Ângulo de fase (${anguloDeFase}) indica baixo risco de sarcopenia.`);
    } else if (anguloDeFase < 4.54) {
      criterios.push(`Ângulo de fase (${anguloDeFase}) indica risco aumentado de sarcopenia.`);
    } else {
      criterios.push(`Ângulo de fase (${anguloDeFase}) sugere necessidade de métodos adicionais de triagem.`);
    }

    const sarcopenia = criterios.some(item =>
      item.toLowerCase().includes('abaixo') ||
      item.toLowerCase().includes('fraqueza') ||
      item.toLowerCase().includes('risco aumentado') ||
      item.toLowerCase().includes('comprometida')
    );

    const userPatient = localStorage.getItem('user');
    let patientData = {} as InterfaceRegistration;

    if (userPatient) {
      patientData = JSON.parse(userPatient).data;
    }

    setLaudo(
      <Card className="mt-4 shadow-sm border-0">
        <Card.Body>
          <Card.Title className="text-center text-primary mb-3">Resultado da Avaliação</Card.Title>

          <h5 className="mb-3 text-secondary">Informações do Paciente</h5>
          <ul className="mb-4">
            <li><strong>Nome:</strong> {patientData.name}</li>
            <li><strong>Email:</strong> {patientData.email}</li>
            <li><strong>Telefone:</strong> {patientData.phone}</li>
            <li><strong>Data de Nascimento:</strong> {patientData.birthdate}</li>
            <li><strong>Idade:</strong> {patientData.age}</li>
            <li><strong>Altura:</strong> {patientData.height} cm</li>
            <li><strong>Peso:</strong> {patientData.weight} kg</li>
            <li><strong>CPF:</strong> {patientData.cpf}</li>
            <li><strong>Qualidade do Sono:</strong> {patientData.sleep}</li>
            <li><strong>Visão:</strong> {patientData.vision}</li>
            <li><strong>Audição:</strong> {patientData.hearing}</li>
            <li><strong>Alcoolismo:</strong> {patientData.alcoholic}</li>
            <li><strong>Fumante:</strong> {patientData.smoker}</li>
            <li><strong>Medicamentos:</strong> {patientData.medicines}</li>
            <li><strong>Medicamentos Específicos:</strong> {
              Array.isArray(patientData.specificMedicines)
                ? patientData.specificMedicines.join(', ')
                : patientData.specificMedicines
            }</li>
            <li><strong>Atividade Física:</strong> {patientData.physicalActivity}</li>
            <li><strong>Histórico de Quedas:</strong> {patientData.fallHistory}</li>
            <li><strong>Motivo da Avaliação:</strong> {patientData.reason}</li>
            <li><strong>Local da Avaliação:</strong> {patientData.location}</li>
          </ul>

          <h5 className="mb-3 text-secondary">Parâmetros Avaliados</h5>
          <ul className="mb-3">
            <li><strong>Força de Preensão Manual:</strong> {forcaPreensao} kgf</li>
            <li><strong>TUG:</strong> {tug} s</li>
            <li><strong>Angulo de Fase:</strong> {anguloDeFase}</li>
            <li><strong>Sentar e Levantar:</strong> {sentarLevantar} s</li>
            <li><strong>Circunferência da Panturrilha:</strong> {panturrilha} cm</li>
            <li><strong>Sexo:</strong> {sexo}</li>
          </ul>

          <Alert variant={sarcopenia ? 'danger' : 'success'}>
            <strong>Conclusão:</strong> {sarcopenia
              ? 'Risco de sarcopenia identificado.'
              : 'Todos os parâmetros estão dentro da normalidade.'}
            <ul className="mt-2">{criterios.map((c, i) => <li key={i}>{c}</li>)}</ul>
          </Alert>
        </Card.Body>
      </Card>
    );
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4 text-primary">Avaliação de Sarcopenia</h1>
      <Card className="p-4 mx-auto shadow-sm" style={{ maxWidth: '700px' }}>
        <Card.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Força de Preensão (kgf)</Form.Label>
                  <Form.Control type="number" value={forcaPreensao ?? ''} onChange={(e) => setForcaPreensao(parseFloat(e.target.value))} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>TUG (s)</Form.Label>
                  <Form.Control type="number" value={tug ?? ''} onChange={(e) => setTug(parseFloat(e.target.value))} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Ângulo de Fase</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={anguloDeFase ?? ''}
                    onChange={(e) => setAnguloDeFase(e.target.value === '' ? undefined : parseFloat(e.target.value))}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Sentar e Levantar (s)</Form.Label>
                  <Form.Control type="number" value={sentarLevantar ?? ''} onChange={(e) => setSentarLevantar(parseFloat(e.target.value))} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Circunferência da Panturrilha (cm)</Form.Label>
                  <Form.Control type="number" value={panturrilha ?? ''} onChange={(e) => setPanturrilha(parseFloat(e.target.value))} />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4">
              <Form.Label>Sexo</Form.Label>
              <Form.Select value={sexo} onChange={(e) => setSexo(e.target.value)}>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </Form.Select>
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" onClick={gerarLaudo}>
                Gerar Avaliação
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      {laudo}
    </Container>
  );
}

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
import './SarcopeniaAssessment.css';

export function SarcopeniaAssessment() {
  const [forcaPreensao, setForcaPreensao] = useState<number | undefined>();
  const [tug, setTug] = useState<number | undefined>();
  const [anguloDeFase, setAnguloDeFase] = useState<number | undefined>();
  // const [equilibrioUnipodal, setEquilibrioUnipodal] = useState<number | undefined>();
  const [sentarLevantar, setSentarLevantar] = useState<number | undefined>();
  const [panturrilha, setPanturrilha] = useState<number | undefined>();
  const [sexo, setSexo] = useState('Masculino');
  const [laudo, setLaudo] = useState<any>(null);

  const gerarLaudo = () => {
    if (
      forcaPreensao === undefined ||
      tug === undefined ||
      anguloDeFase === undefined ||
      // equilibrioUnipodal === undefined ||
      sentarLevantar === undefined ||
      panturrilha === undefined
    ) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const tugAjustada = tug / ((anguloDeFase / 100) ** 2);
    const criterios: string[] = [];

    if ((sexo === 'Masculino' && forcaPreensao < 27) || (sexo === 'Feminino' && forcaPreensao < 16)) {
      criterios.push('Força de preensão abaixo do valor de referência. Pode indicar sarcopenia.');
    }

    if ((sexo === 'Masculino' && tugAjustada < 6.0) || (sexo === 'Feminino' && tugAjustada < 5.0)) {
      criterios.push('Índice de Massa Magra (IMMA) abaixo do esperado.');
    }

    // if (equilibrioUnipodal < 10) {
    //   criterios.push('Equilíbrio Unipodal menor que 10 segundos.');
    // }

    if (sentarLevantar > 15) {
      criterios.push('Tempo acima do recomendado. Possível fraqueza muscular.');
    } else {
      criterios.push('Tempo dentro do esperado.');
    }

    if ((sexo === 'Masculino' && panturrilha < 31) || (sexo === 'Feminino' && panturrilha < 30)) {
      criterios.push('Circunferência da panturrilha abaixo do recomendado.');
    } else {
      criterios.push('Circunferência da panturrilha dentro da normalidade.');
    }

    const sarcopenia = criterios.some(item =>
      item.includes('abaixo') || item.includes('fraqueza') || item.includes('menor')
    );

    setLaudo(
      <Card className="mt-4 shadow-sm border-0">
        <Card.Body>
          <Card.Title className="text-center text-primary mb-3">Resultado da Avaliação</Card.Title>
          <ul className="mb-3">
            <li><strong>Força de Preensão Manual:</strong> {forcaPreensao} kgf</li>
            <li><strong>Tug:</strong> {tug} kg, índice ajustado: {tugAjustada.toFixed(2)} kg/m²</li>
            <li><strong>Angulo de fase</strong> {anguloDeFase} cm</li>
            {/* <li><strong>Equilíbrio Unipodal:</strong> {equilibrioUnipodal} s</li> */}
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
                  <Form.Label>Massa Magra (kg)</Form.Label>
                  <Form.Control type="number" value={tug ?? ''} onChange={(e) => setTug(parseFloat(e.target.value))} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Estatura (cm)</Form.Label>
                  <Form.Control type="number" value={anguloDeFase ?? ''} onChange={(e) => setAnguloDeFase(parseFloat(e.target.value))} />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* <Form.Group className="mb-3">
                  <Form.Label>Equilíbrio Unipodal (s)</Form.Label>
                  <Form.Control type="number" value={equilibrioUnipodal ?? ''} onChange={(e) => setEquilibrioUnipodal(parseFloat(e.target.value))} />
                </Form.Group> */}
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

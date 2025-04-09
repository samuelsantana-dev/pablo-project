// laudo_sarcopenia.tsx
import { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import {
  Container,
  Form,
  Button,
  Alert,
  Card,
  Row,
  Col,
} from 'react-bootstrap';

export function LaudoSarcopenia() {
  const laudoRef = useRef<HTMLDivElement>(null);
  const [forcaPreensao, setForcaPreensao] = useState<number | undefined>();
  const [tug, setTug] = useState<number | undefined>();
  const [anguloDeFase, setAnguloDeFase] = useState<number | undefined>();
  const [sentarLevantar, setSentarLevantar] = useState<number | undefined>();
  const [panturrilha, setPanturrilha] = useState<number | undefined>();
  const [sexo, setSexo] = useState('Masculino');
  const [laudo, setLaudo] = useState<JSX.Element | null>(null);

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

    const tugAjustada = tug / ((anguloDeFase / 100) ** 2);
    const criterios: string[] = [];

    if ((sexo === 'Masculino' && forcaPreensao < 27) || (sexo === 'Feminino' && forcaPreensao < 16)) {
      criterios.push('Força de preensão abaixo do valor de referência. Pode indicar sarcopenia.');
    }

    if ((sexo === 'Masculino' && tugAjustada < 6.0) || (sexo === 'Feminino' && tugAjustada < 5.0)) {
      criterios.push('Índice de Massa Magra (IMMA) abaixo do esperado.');
    }

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
      <div ref={laudoRef}>
        <Card className="mt-4 shadow-sm border-0">
          <Card.Body>
            <Card.Title className="text-center text-primary mb-3">Resultado da Avaliação</Card.Title>
            <ul className="mb-3">
              <li><strong>Força de Preensão Manual:</strong> {forcaPreensao} kgf</li>
              <li><strong>TUG:</strong> {tug} kg, índice ajustado: {tugAjustada.toFixed(2)} kg/m²</li>
              <li><strong>Ângulo de Fase:</strong> {anguloDeFase} cm</li>
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
      </div>
    );
  };

  const gerarPDF = () => {
    if (!laudoRef.current) {
      alert("Por favor, gere a avaliação primeiro.");
      return;
    }

    html2pdf()
      .set({
        margin: 10,
        filename: 'avaliacao_sarcopenia.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      })
      .from(laudoRef.current)
      .save();
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
                  <Form.Label>TUG</Form.Label>
                  <Form.Control type="number" value={tug ?? ''} onChange={(e) => setTug(parseFloat(e.target.value))} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Ângulo de Fase</Form.Label>
                  <Form.Control type="number" value={anguloDeFase ?? ''} onChange={(e) => setAnguloDeFase(parseFloat(e.target.value))} />
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

      {laudo && (
        <div className="text-center mt-3">
          <Button variant="primary" onClick={gerarPDF}>
            Baixar PDF
          </Button>
        </div>
      )}
    </Container>
  );
}

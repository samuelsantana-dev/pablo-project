import { useState } from 'react';
import {
  Container,
  Form,
  Button,
  Alert,
  Card,
} from 'react-bootstrap';
import './SarcopeniaAssessment.css';

export function SarcopeniaAssessment() {
  const [forcaPreensao, setForcaPreensao] = useState<number | undefined>(undefined);
  const [tug, setTug] = useState<number | undefined>(undefined);
  const [estatura, setEstatura] = useState<number | undefined>(undefined);
  const [equilibrioUnipodal, setEquilibrioUnipodal] = useState<number | undefined>(undefined);
  const [sentarLevantar, setSentarLevantar] = useState<number | undefined>(undefined);
  const [panturrilha, setPanturrilha] = useState<number | undefined>(undefined);
  const [sexo, setSexo] = useState('Masculino');
  const [laudo, setLaudo] = useState<any>(null);

  const gerarLaudo = () => {
    if (
      forcaPreensao === undefined ||
      tug === undefined ||
      estatura === undefined ||
      equilibrioUnipodal === undefined ||
      sentarLevantar === undefined ||
      panturrilha === undefined
    ) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const tugAjustada = tug / ((estatura / 100) ** 2);
    const criterios: string[] = [];

    if ((sexo === 'Masculino' && forcaPreensao < 27) || (sexo === 'Feminino' && forcaPreensao < 16)) {
      criterios.push('Força de preensão abaixo do valor de referência (27kg para homens, 16kg para mulheres). Pode indicar sarcopenia.');
    }

    if ((sexo === 'Masculino' && tugAjustada < 6.0) || (sexo === 'Feminino' && tugAjustada < 5.0)) {
      criterios.push('Índice de Massa Magra (IMMA) abaixo do esperado.');
    }

    if (equilibrioUnipodal < 10) {
      criterios.push('Equilíbrio Unipodal menor que 10 segundos.');
    }

    if (sentarLevantar > 15) {
      criterios.push('Tempo acima do recomendado (mais de 15 segundos). Possível fraqueza muscular.');
    } else {
      criterios.push('Tempo dentro do esperado (abaixo de 15 segundos).');
    }

    if ((sexo === 'Masculino' && panturrilha < 31) || (sexo === 'Feminino' && panturrilha < 30)) {
      criterios.push('Circunferência da panturrilha abaixo do recomendado (31cm para homens, 30cm para mulheres). Pode indicar baixa massa muscular.');
    } else {
      criterios.push('Circunferência da panturrilha dentro da normalidade.');
    }

    const sarcopenia = criterios.some(item => item.includes('abaixo') || item.includes('fraqueza') || item.includes('menor'));

    setLaudo(
      <Card className="mt-4">
        <Card.Body>
          <Card.Title>Avaliação Fisioterapêutica</Card.Title>
          <p><strong>Força de Preensão Manual:</strong> {forcaPreensao} kgf</p>
          <p><strong>Massa Magra:</strong> {tug} kg, índice ajustado: {tugAjustada.toFixed(2)} kg/m²</p>
          <p><strong>Estatura:</strong> {estatura} cm</p>
          <p><strong>Equilíbrio Unipodal:</strong> {equilibrioUnipodal} segundos</p>
          <p><strong>Sentar e Levantar:</strong> {sentarLevantar} segundos</p>
          <p><strong>Circunferência da Panturrilha:</strong> {panturrilha} cm</p>
          <p><strong>Sexo:</strong> {sexo}</p>
          {sarcopenia ? (
            <Alert variant="danger">
              <strong>Conclusão:</strong> Risco de <strong>sarcopenia</strong> identificado.
              <br />
              <ul>{criterios.map((criterio, index) => <li key={index}>{criterio}</li>)}</ul>
              Procure um profissional de saúde para acompanhamento.
            </Alert>
          ) : (
            <Alert variant="success">
              <strong>Conclusão:</strong> Todos os parâmetros estão dentro da normalidade.
              <br />
              <ul>{criterios.map((criterio, index) => <li key={index}>{criterio}</li>)}</ul>
              Mantenha hábitos saudáveis!
            </Alert>
          )}
        </Card.Body>
      </Card>
    );
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Avaliação de Sarcopenia</h1>
      <Card className="form-container">
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Força de Preensão Manual (kgf):</Form.Label>
              <Form.Control type="number" value={forcaPreensao ?? ''} onChange={(e) => setForcaPreensao(parseFloat(e.target.value))} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Massa Magra (kg):</Form.Label>
              <Form.Control type="number" value={tug ?? ''} onChange={(e) => setTug(parseFloat(e.target.value))} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Estatura (cm):</Form.Label>
              <Form.Control type="number" value={estatura ?? ''} onChange={(e) => setEstatura(parseFloat(e.target.value))} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Equilíbrio Unipodal (segundos):</Form.Label>
              <Form.Control type="number" value={equilibrioUnipodal ?? ''} onChange={(e) => setEquilibrioUnipodal(parseFloat(e.target.value))} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Sentar e Levantar (5 repetições):</Form.Label>
              <Form.Control type="number" value={sentarLevantar ?? ''} onChange={(e) => setSentarLevantar(parseFloat(e.target.value))} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Circunferência da Panturrilha (cm):</Form.Label>
              <Form.Control type="number" value={panturrilha ?? ''} onChange={(e) => setPanturrilha(parseFloat(e.target.value))} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Sexo:</Form.Label>
              <Form.Select value={sexo} onChange={(e) => setSexo(e.target.value)}>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" onClick={gerarLaudo}>Gerar Avaliação</Button>
          </Form>
        </Card.Body>
      </Card>
      {laudo}
    </Container>
  );
}

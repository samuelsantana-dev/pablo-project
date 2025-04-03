import { useState } from 'react';
import {
  Container,
  Form,
  Button,
  Alert,
  Card,
} from 'react-bootstrap';
import './SarcopeniaAssessment.css'; // Importe seu CSS

export function SarcopeniaAssessment() {
  const [forcaPreensao, setForcaPreensao] = useState<number | undefined>(undefined);
  const [massaMagra, setMassaMagra] = useState<number | undefined>(undefined);
  const [estatura, setEstatura] = useState<number | undefined>(undefined);
  const [equilibrioUnipodal, setEquilibrioUnipodal] = useState<number | undefined>(undefined);
  const [sentarLevantar, setSentarLevantar] = useState<number | undefined>(undefined);
  const [panturrilha, setPanturrilha] = useState<number | undefined>(undefined);
  const [sexo, setSexo] = useState('Masculino');
  const [laudo, setLaudo] = useState<any>(null);

  const gerarLaudo = () => {
    if (
      forcaPreensao === undefined ||
      massaMagra === undefined ||
      estatura === undefined ||
      equilibrioUnipodal === undefined ||
      sentarLevantar === undefined ||
      panturrilha === undefined
    ) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const massaMagraAjustada = massaMagra / ((estatura / 100) ** 2);
    const criterios: string[] = [];

    if ((sexo === 'Masculino' && forcaPreensao < 27) || (sexo === 'Feminino' && forcaPreensao < 16)) {
      criterios.push('Este valor é sugestivo de sarcopenia. 
                     Procure um profissional da saúde para avaliação completa." (Valor de referência 27kg para Homens e 16 kg para Mulheres');
    }
    if ((sexo === 'Masculino' && massaMagraAjustada < 6.0) || (sexo === 'Feminino' && massaMagraAjustada < 5.0)) {
      criterios.push('Índice de Massa Magra (IMMA) abaixo do esperado.');
    }
    if (equilibrioUnipodal < 30) {
      criterios.push('Equilíbrio Unipodal menor que 10 segundos.');
    }
    if (sentarLevantar > 15) {
      criterios.push("Tempo acima do recomendado. Possível fraqueza muscular e sarcopenia. 
                     Procure um profissional da saúde para avaliação completa." (Valor de referência abaixo de 15 segundos).');
    }
    if (sentarLevantar < 15) {
      criterios.push("Tempo dentro do esperado." (Recomendado abaixo de 15 segundos).');
    }
    if ((sexo === 'Masculino' && panturrilha < 31) || (sexo === 'Feminino' && panturrilha < 30)) {
  criterios.push("Medida abaixo do recomendado. Pode indicar baixa massa muscular. 
                 Procure um profissional da saúde para avaliação completa." ( Valor recomendado 31cm Masc./ 30cm Fem);
} else if ((sexo === 'Masculino' && panturrilha >= 31) || (sexo === 'Feminino' && panturrilha >= 30)) {
  criterios.push("Medida dentro da normalidade.");
}

    const sarcopenia = criterios.length > 0;

    setLaudo(
      <Card>
        <Card.Body>
          <Card.Title>Relatório da Avaliação</Card.Title>
          <p>
            <strong>Força de Preensão Manual:</strong> {forcaPreensao} kgf
          </p>
          <p>
            <strong>Massa Magra:</strong> {massaMagra} kg, índice ajustado: {massaMagraAjustada.toFixed(2)} kg/m²
          </p>
          <p>
            <strong>Equilíbrio Unipodal:</strong> {equilibrioUnipodal} segundos
          </p>
          <p>
            <strong>Sentar e Levantar:</strong> {sentarLevantar} segundos
          </p>
          <p>
            <strong>Circunferência da Panturrilha:</strong> {panturrilha} cm
          </p>
          <p>
            <strong>Sexo:</strong> {sexo}
          </p>
          {sarcopenia ? (
            <Alert variant="danger">
              Conclusão: Os resultados indicam <strong>risco de sarcopenia</strong>.
              <br />
              Itens fora dos parâmetros esperados:
              <ul>{criterios.map((criterio, index) => <li key={index}>{criterio}</li>)}</ul>
              Procure um profissional de saúde para acompanhamento.
            </Alert>
          ) : (
            <Alert variant="success">
              Conclusão: Os resultados estão <strong>dentro dos parâmetros normais</strong>.
              Continue com hábitos saudáveis!
            </Alert>
          )}
        </Card.Body>
      </Card>
    );
  };

  return (
    <Container className="mt-4">
      <h1>Avaliação de Sarcopenia</h1>
      <Card className="form-container">
        <Card.Body>
          <Form id="formulario">
            <Form.Group>
              <Form.Label>Força de Preensão Manual (kgf):</Form.Label>
              <Form.Control
                type="number"
                min="0"
                step="0.1"
                placeholder="Ex: 28"
                value={forcaPreensao}
                onChange={(e) => setForcaPreensao(parseFloat(e.target.value))}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Massa Magra (kg):</Form.Label>
              <Form.Control
                type="number"
                min="0"
                step="0.1"
                placeholder="Ex: 45"
                value={massaMagra}
                onChange={(e) => setMassaMagra(parseFloat(e.target.value))}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Estatura (cm):</Form.Label>
              <Form.Control
                type="number"
                min="100"
                step="1"
                placeholder="Ex: 170"
                value={estatura}
                onChange={(e) => setEstatura(parseFloat(e.target.value))}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Equilíbrio Unipodal (segundos):</Form.Label>
              <Form.Control
                type="number"
                min="0"
                step="0.1"
                placeholder="Ex: 12"
                value={equilibrioUnipodal}
                onChange={(e) => setEquilibrioUnipodal(parseFloat(e.target.value))}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Sentar e Levantar (segundos, 5 repetições):</Form.Label>
              <Form.Control
                type="number"
                min="0"
                step="0.1"
                placeholder="Ex: 15"
                value={sentarLevantar}
                onChange={(e) => setSentarLevantar(parseFloat(e.target.value))}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Circunferência da Panturrilha (cm):</Form.Label>
              <Form.Control
                type="number"
                min="0"
                step="0.1"
                placeholder="Ex: 32"
                value={panturrilha}
                onChange={(e) => setPanturrilha(parseFloat(e.target.value))}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Sexo:</Form.Label>
              <Form.Control as="select" value={sexo} onChange={(e) => setSexo(e.target.value)} required>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" onClick={gerarLaudo}>Gerar Relatório</Button>
          </Form>
        </Card.Body>
      </Card>
      {laudo}
    </Container>
  );
}

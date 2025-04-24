/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Container,
  Form,
  Button,
  Alert,
  Card,
  Row,
  Col,
} from 'react-bootstrap';
import { AvaliacaoData, exportarAvaliacaoParaPDF } from '../../utils/exportarPdf';
import { salvarNoLocalStorage } from '../../utils/saveLocalStorage';
import { InterfaceRegistration } from '../../types';

export function SarcopeniaAssessment() {

  const navigate = useNavigate();


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

    // Avaliação ângulo de fase
    if (anguloDeFase < 4.54) {
      criterios.push(`Ângulo de Fase: ${anguloDeFase.toFixed(2)}°. Valor de Referência: 4.54 - 5.25. Interpretação: O valor está **baixo**, sugerindo possível redução na massa muscular ou integridade celular. Recomenda-se avaliação adicional.`);
    } else if (anguloDeFase >= 4.54 && anguloDeFase <= 5.25) {
      criterios.push(`Ângulo de Fase: ${anguloDeFase.toFixed(2)}°. Valor de Referência: 4.54 - 5.25. Interpretação: O valor está **dentro da faixa esperada**${anguloDeFase < 4.7 ? ', mas próximo do limite inferior (4.54), indicando possível redução na massa muscular. Recomenda-se métodos adicionais de triagem.' : '.'}`);
    } else {
      criterios.push(`Ângulo de Fase: ${anguloDeFase.toFixed(2)}°. Valor de Referência: 4.54 - 5.25. Interpretação: O valor está alto, sugerindo boa integridade celular.`);
    }
    

    // Avaliação força de preensão
    const refForca = sexo === 'Masculino' ? 27 : 16;
    if (forcaPreensao < refForca) {
      criterios.push(`Força de Preensão: ${forcaPreensao} kg. Valor de Referência: ${sexo === 'Masculino' ? 'Homem < 27 kg' : 'Mulher < 16 kg'}. Interpretação: Valor abaixo do esperado, pode indicar redução de força muscular.`);
    } else {
      criterios.push(`Força de Preensão: ${forcaPreensao} kg. Valor de Referência: ${sexo === 'Masculino' ? 'Homem < 27 kg' : 'Mulher < 16 kg'}. Interpretação: ${forcaPreensao === refForca && sexo === 'Masculino' ? 'Valor no limite superior (exatamente 27 kg), força adequada mas sem margem de segurança.' : 'Valor acima do esperado, sugerindo força preservada.'}`);
    }

    // Avaliação panturrilha
    const refPanturrilha = 31;
    if (panturrilha < refPanturrilha) {
      criterios.push(`Circunferência da Panturrilha: ${panturrilha} cm. Valor de Referência: < 31 cm. Interpretação: Valor abaixo do esperado, pode indicar redução de massa muscular.`);
    } else {
      criterios.push(`Circunferência da Panturrilha: ${panturrilha} cm. Valor de Referência: < 31 cm. Interpretação: Valor acima do limite de referência (${panturrilha} cm vs. 31 cm), sugerindo circunferência preservada ou aumentada, reduzindo a probabilidade de sarcopenia.`);
    }

    // Avaliação sentar e levantar
    const refSentarLevantar = 15;
    if (sentarLevantar > refSentarLevantar) {
      criterios.push(`Teste Sentar e Levantar: ${sentarLevantar} s. Valor de Referência: <= 15 s. Interpretação: Tempo aumentado, pode indicar redução de força nos membros inferiores.`);
    } else {
      criterios.push(`Teste Sentar e Levantar: ${sentarLevantar} s. Valor de Referência: <= 15 s. Interpretação: Tempo dentro do esperado, indicando boa capacidade funcional e força muscular nos membros inferiores.`);
    }

    // Avaliação TUG
    const refTUG = 19;
    if (tug > refTUG) {
      criterios.push(`TUG - Time Up and Go: ${tug} s. Valor de Referência: <= 19 s. Interpretação: Tempo aumentado, pode indicar risco de mobilidade reduzida.`);
    } else {
      criterios.push(`  Time Up and Go: ${tug} s. Valor de Referência: <= 19 s. Interpretação: Tempo dentro da normalidade, sugerindo boa mobilidade e equilíbrio, sem risco aumentado de quedas.`);
    }

    const sarcopenia = criterios.some(item =>
      item.includes('abaixo') || item.includes('aumentado') || item.includes('redução')
    );

    const userPatient = localStorage.getItem('user');
    let patientData = {} as InterfaceRegistration;

    if (userPatient) {
      patientData = JSON.parse(userPatient).data;
    }

    const dados = {
      forcaPreensao,
      tug,
      anguloDeFase,
      sentarLevantar,
      panturrilha,
      sexo,
    };
    
    salvarNoLocalStorage('dadosAvaliacao', dados);

    // 1. Função para verificar risco com base nos valores
function verificarRiscoSarcopenia(
  anguloDeFase: number,
  forcaPreensao: number,
  panturrilha: number,
  sentarLevantar: number,
  tug: number,
  sexo: string
): boolean {
  const faseLimite = sexo === 'Masculino' ? 5.25 : 4.54;
  const preensaoLimite = sexo === 'Masculino' ? 27 : 16; // padrão EWGSOP2
  const panturrilhaLimite = 31;
  const sentarLevantarLimite = 15;
  const tugLimite = 19;

  return (
    anguloDeFase < faseLimite ||
    forcaPreensao < preensaoLimite ||
    panturrilha < panturrilhaLimite ||
    sentarLevantar > sentarLevantarLimite ||
    tug > tugLimite
  );
}

const risco = verificarRiscoSarcopenia(
  anguloDeFase,
  forcaPreensao,
  panturrilha,
  sentarLevantar,
  tug,
  sexo
);


    setLaudo(
      <Card className="mt-4 shadow-sm border-0">
        <Card.Body>
          <Card.Title className="text-center text-primary mb-3">Resultado da Avaliação</Card.Title>
    
          <h5 className="mb-3 text-secondary">Avaliação de Sarcopenia</h5>
          <ul className="mb-3">
            {criterios.map((criterio, index) => (
              <li
                key={index}
                dangerouslySetInnerHTML={{ __html: criterio.replace(/\. /g, '.<br/>') }}
              />
            ))}
          </ul>
    
          <div className="mb-3">
  <p><strong>Resumo:</strong></p>
  <p>
    Foram analisados cinco critérios: ângulo de fase, força de preensão manual, circunferência da panturrilha, teste de sentar e levantar e TUG.
    Abaixo estão as interpretações específicas de cada parâmetro.
  </p>
</div>

<Alert variant={risco ? 'danger' : 'success'}>
  <strong>Conclusão:</strong>{' '}
  {risco
    ? 'Possível risco de sarcopenia identificado. Recomenda-se avaliação adicional.'
    : 'Sem risco de sarcopenia. Todos os parâmetros estão dentro da normalidade, indicando boa força muscular, mobilidade e composição corporal.'}
</Alert>

    
          <div className="mt-4">
            <h6 className="text-muted">Referências:</h6>
            <ul style={{ fontSize: '0.9rem' }}>
              <li>
                CRUZ-JENTOFT, Alfonso J. et al. <em>Sarcopenia: revised European consensus on definition and diagnosis</em>. Age and Ageing, v. 48, n. 1, p. 16–31, 2019.
              </li>
              <li>
                ZHANG, Jian et al. <em>The Diagnostic Accuracy and Cutoff Value of Phase Angle for Screening Sarcopenia: A Systematic Review and Meta-Analysis</em>. Journal of the American Medical Directors Association, 2024.
              </li>
            </ul>
    
            <div className="d-flex justify-content-center gap-3 mt-4">
            <Button 
                variant="outline-primary" 
                onClick={() => navigate('/sarc-form')}
              >
                Avançar para SARC-F
              </Button>
              <Button
  variant="primary"
  onClick={() => {
    const criteriosTexto = criterios.map((item) =>
      item.replace(/<[^>]+>/g, '') // remove HTML caso tenha
    ).join('\n\n');

    const conclusaoTexto = sarcopenia
      ? 'Possível risco de sarcopenia identificado. Recomenda-se avaliação adicional.'
      : 'Todos os parâmetros estão dentro da normalidade.';

    const laudoCompleto = `${criteriosTexto}\n\nConclusão: ${conclusaoTexto}`;

    exportarAvaliacaoParaPDF({
      forcaPreensao,
      tug,
      anguloDeFase,
      sentarLevantar,
      panturrilha,
      sexo,
      laudo: laudoCompleto,
      ...patientData as AvaliacaoData,
      specificMedicines: Array.isArray(patientData.specificMedicines)
        ? patientData.specificMedicines.join(', ')
        : patientData.specificMedicines ?? '',
    });
  }}
>
  Imprimir PDF
</Button>

            </div>
          </div>
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
                  <Form.Control 
                    type="number" 
                    value={forcaPreensao ?? ''} 
                    onChange={(e) => setForcaPreensao(parseFloat(e.target.value))} 
                    min="0"
                    step="0.1"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>TUG (s)</Form.Label>
                  <Form.Control 
                    type="number" 
                    value={tug ?? ''} 
                    onChange={(e) => setTug(parseFloat(e.target.value))} 
                    min="0"
                    step="0.1"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Teste Sentar e Levantar (s)</Form.Label>
                  <Form.Control 
                    type="number" 
                    value={sentarLevantar ?? ''} 
                    onChange={(e) => setSentarLevantar(parseFloat(e.target.value))} 
                    min="0"
                    step="0.1"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Circunferência da Panturrilha (cm)</Form.Label>
                  <Form.Control 
                    type="number" 
                    value={panturrilha ?? ''} 
                    onChange={(e) => setPanturrilha(parseFloat(e.target.value))} 
                    min="0"
                    step="0.1"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Ângulo de Fase (°)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={anguloDeFase ?? ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      setAnguloDeFase(value === '' ? undefined : parseFloat(value));
                    }}
                    min="0"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Sexo</Form.Label>
                  <Form.Select value={sexo} onChange={(e) => setSexo(e.target.value)}>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

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
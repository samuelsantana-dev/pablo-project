import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import CheckboxGroup from '../../components/checkbox_group';

interface Question {
  label: string;
  name: string;
  options: {
    value: string;
    label: string;
  }[];
}

const questions: Question[] = [
  {
    label: 'Qual a dificuldade que tem para levantar e carregar 4,5kg?',
    name: 'forca',
    options: [
      { value: '0', label: 'Nenhuma' },
      { value: '1', label: 'Alguma' },
      { value: '2', label: 'Muita ou impossível' },
    ],
  },
  {
    label: 'Qual a dificuldade que tem para atravessar uma sala?',
    name: 'apoio',
    options: [
      { value: '0', label: 'Nenhuma' },
      { value: '1', label: 'Alguma' },
      { value: '2', label: 'Muita, com apoio ou impossível' },
    ],
  },
  {
    label: 'Qual a dificuldade que tem para se levantar de uma cadeira ou de uma cama?',
    name: 'levantar',
    options: [
      { value: '0', label: 'Nenhuma' },
      { value: '1', label: 'Alguma' },
      { value: '2', label: 'Muita ou impossível sem ajuda' },
    ],
  },
  {
    label: 'Qual a dificuldade que tem para subir um lance de 10 degraus?',
    name: 'escadas',
    options: [
      { value: '0', label: 'Nenhuma' },
      { value: '1', label: 'Alguma' },
      { value: '2', label: 'Muita ou impossível' },
    ],
  },
  {
    label: 'Quantas vezes caiu no último ano?',
    name: 'quedas',
    options: [
      { value: '0', label: 'Nenhuma' },
      { value: '1', label: '1 a 3 quedas' },
      { value: '2', label: '4 quedas ou mais' },
    ],
  },
];

export const SarcFForm: React.FC = () => {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // garante apenas uma seleção por grupo
    }));
  };

  const handleSubmit = () => {
    const total = Object.values(formData).reduce((sum, val) => sum + parseInt(val), 0);
    const predicao = total >= 4 ? 'Sim' : 'Não';

    alert(
      `Dados capturados:\n${JSON.stringify(formData, null, 2)}\nPontuação total: ${total}\nPredição de sarcopenia: ${predicao}`
    );
  };

  return (
    <Container className="my-4">
      <h1>SARC-F - Ferramenta de Rastreamento do Risco de Sarcopenia</h1>
      <form>
        {questions.map((q) => (
          <CheckboxGroup
            key={q.name}
            label={q.label}
            name={q.name}
            values={[formData[q.name] || '']}
            onChange={handleCheckboxChange}
            options={q.options}
          />
        ))}
        <Button variant="primary" onClick={handleSubmit}>
          Enviar
        </Button>
      </form>
    </Container>
  );
};

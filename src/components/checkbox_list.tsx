import React from 'react';
import { Form } from 'react-bootstrap';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  label: string;
  name: string;
  options: RadioOption[];
  selectedValue: string;
  onChange: (selectedValue: string) => void;
}

const CheckboxListInput = ({ label, name, options, selectedValue, onChange }: RadioGroupProps) => {
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value); // Atualiza o valor selecionado
  };

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      {options.map((option) => (
        <Form.Check
          key={option.value}
          type="radio"
          label={option.label}
          value={option.value}
          name={name}
          checked={selectedValue === option.value}
          onChange={handleRadioChange}
        />
      ))}
    </Form.Group>
  );
};

export default CheckboxListInput;

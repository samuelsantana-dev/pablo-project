import React from 'react';
import { Form } from 'react-bootstrap';

interface Option {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  label: string;
  name: string;
  values: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: Option[];
  inline?: boolean;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ 
  label, 
  name, 
  values, 
  onChange, 
  options,
  inline = false 
}) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <div>
        {options.map((option) => (
          <Form.Check
            key={option.value}
            type="checkbox"
            inline={inline}
            label={option.label}
            name={name}
            id={`${name}-${option.value}`}
            value={option.value}
            checked={values.includes(option.value)}
            onChange={handleCheckboxChange}
          />
        ))}
      </div>
    </Form.Group>
  );
};

export default CheckboxGroup;
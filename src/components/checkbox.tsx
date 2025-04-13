import React from 'react';
import { Form } from 'react-bootstrap';

interface CheckboxInputProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxInput = ({ label, name, checked, onChange }: CheckboxInputProps) => {
  return (
    <Form.Group>
      <Form.Check
        type="checkbox"
        label={label}
        name={name}
        checked={checked}
        onChange={onChange}
      />
    </Form.Group>
  );
};

export default CheckboxInput;

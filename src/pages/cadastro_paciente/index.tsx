import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import '../../styles.css';
import { RegisterPatient } from '../../api/routesPacientes';
import CheckboxListInput from '../../components/checkbox_list';
import CheckboxGroup from '../../components/checkbox_group';

export function RegistrationPatient() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [cpf, setCpf] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleSelectionChange = (newSelectedValue: string) => {
    setSelectedOption(newSelectedValue);  };


  const [formData, setFormData] = useState({
    selectedOption: '',
    selectedOptions: [] as string[],});
    const personalBackground = [ //Antecedentes pessoais
      { value: 'cardiorespiratory_disease', label: 'Doença cardiorrespiratória' },
      { value: 'intestinal_constipation', label: 'Constipação intestinal' },
      { value: 'kidney_disease', label: 'Doença renal' },
      { value: 'hemorrhoids', label: 'Hemorroidas' },
      { value: 'neoplasms', label: 'Neoplasias' },
      { value: 'urinary_infection', label: 'Infecção urinária' },
      { value: 'urinary_incontinence', label: 'Incontinência urinária' },
      { value: 'heart_disease', label: 'Cardiopatia' },
      { value: 'obesity', label: 'Obesidade' },
      { value: 'allergies', label: 'Alergias' },
      { value: 'hypertension', label: 'HAS' },
      { value: 'diabetes', label: 'DM' },
      { value: 'other', label: 'Outros' }
    ];

    const sleepOptions = [
      { value: 'good', label: 'Bom' },
      { value: 'regular', label: 'Regular' },
      { value: 'bad', label: 'Ruim' }
    ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prevData => {
        // Para checkboxes, atualizamos o array selectedOptions
        const newValues = checked
          ? [...prevData.selectedOptions, value]
          : prevData.selectedOptions.filter(v => v !== value);
        
        return {
          ...prevData,
          selectedOptions: newValues,
        };
      });
    } else {
      // Para outros inputs (text, select, etc.)
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    if (birthdate) {
      setAge(calculateAge(birthdate).toString());
    } else {
      setAge('');
    }
  }, [birthdate]);

  const calculateAge = (birthdate: string): number => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = { name, email, phone, birthdate, age, height, cpf, weight };
    console.log(data);
    try {
      
     await  RegisterPatient({data});
     alert('Formulário enviado com sucesso!');
    handleReset();
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
      alert('Erro ao enviar o formulário. Tente novamente.');
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setBirthdate('');
    setAge('');
    setHeight('');
    setWeight('');
    setCpf('');
    localStorage.removeItem('userFormData');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Form
        onSubmit={handleSubmit}
        className="w-75 p-5 bg-white shadow-lg rounded border border-0 form-container"
      >
        <h2 className="text-center mb-4 text-primary">Cadastro de Paciente</h2>

        <Row className="mb-4">
          <Col md={6}>
            <Form.Group controlId="name">
              <Form.Label className="form-label">Nome:</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite o nome completo"
                required
                className="input-field"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label className="form-label">E-mail:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail"
                required
                className="input-field"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
            <Form.Group controlId="phone">
              <Form.Label className="form-label">Telefone:</Form.Label>
              <Form.Control
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Digite o telefone"
                required
                className="input-field"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="birthdate">
              <Form.Label className="form-label">Data de Nascimento:</Form.Label>
              <Form.Control
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                placeholder="dd/mm/aaaa"
                required
                className="input-field"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
            <Form.Group controlId="age">
              <Form.Label className="form-label">Idade:</Form.Label>
              <Form.Control
                type="text"
                value={age}
                readOnly
                placeholder="Idade calculada automaticamente"
                className="input-field"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="height">
              <Form.Label className="form-label">Altura (cm):</Form.Label>
              <Form.Control
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Altura em cm"
                className="input-field"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
            <Form.Group controlId="weight">
              <Form.Label className="form-label">Peso (kg):</Form.Label>
              <Form.Control
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Peso em kg"
                className="input-field"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
            <Form.Group controlId="cpf">
              <Form.Label className="form-label">Cpf (kg):</Form.Label>
              <Form.Control
                type="number"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                placeholder="Cpf"
                className="input-field"
              />
            </Form.Group>
          </Col>
        </Row>

      <CheckboxGroup 
          label="Antecedentes Pessoais"
          name="selectedOptions"
          values={formData.selectedOptions}
          onChange={handleChange}
          options={personalBackground}
          inline
        />

        <CheckboxListInput
         label="Sono"
         name="myRadioGroup"
         options={sleepOptions}
         selectedValue={selectedOption}
         onChange={handleSelectionChange}
        />

        <div className="d-flex justify-content-between mt-3">
          <Button type="submit" variant="primary" className="w-48 custom-btn">
            Enviar
          </Button>
          <Button
            type="button"
            onClick={handleReset}
            variant="outline-secondary"
            className="w-48 custom-btn-reset"
          >
            Redefinir
          </Button>
        </div>
      </Form>
    </Container>
  );
}
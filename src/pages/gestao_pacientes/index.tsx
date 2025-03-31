import { useEffect, useState } from 'react';
import {
  Container,
  Button,
  Table,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { GetPatients } from '../../api/routesPacientes';
import { InterfacePatientRegistration } from '../../types';
import './PatientManagement.css';

export function PatientManagement() {
  const [pacientes, setPacientes] = useState<InterfacePatientRegistration[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetPatients();
        console.log('data', data);
        setPacientes(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container className="mt-4">
      <header className="text-center mb-4">
        <h1>Gestão de Pacientes</h1>
      </header>
      <main>
        <Table responsive bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Idade</th>
              <th>Altura</th>
              <th>Peso</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((paciente) => (
              <tr key={paciente.id}>
                <td>{paciente.id}</td>
                <td>{paciente.name}</td>
                <td>{paciente.email}</td>
                <td>{paciente.phone}</td>
                <td>{paciente.age}</td>
                <td>{paciente.height}</td>
                <td>{paciente.weight}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </main>
      <section id="add-patient" className="mb-4 text-center">
        <Button
          variant="success"
          id="add-patient-btn"
          onClick={() => navigate('/cadastro-paciente')}
        >
          ➕ Cadastrar Paciente
        </Button>
      </section>
      <section className="text-center">
        <Button
          variant="info"
          onClick={() => navigate('/avaliacao-sarcopenia')}
        >
          Avaliação de Sarcopenia
        </Button>
      </section>
    </Container>
  );
}

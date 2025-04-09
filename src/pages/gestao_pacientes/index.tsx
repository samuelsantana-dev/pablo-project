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

  console.log('pacientes', pacientes);
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

  const pacientesTese = [
    {
      name: "Ana Silva",
      email: "ana.silva@email.com",
      phone: "(11) 91234-5678",
      age: 30,
      height: 1.65,
      cpf: "123.456.789-00",
      weight: 60,
      sleep: "Boa",
      vision: "Sem correção",
      hearing: "Normal",
      alcoholic: "Não",
      smoker: "Não",
      medicines: "Nenhum",
      specificMedicines: "",
      physicalActivity: "Caminhada diária",
      fallHistory: "Não",
      reason: "tesste",
      location: "teste"
    },
    {
      name: "Carlos Souza",
      email: "carlos.souza@email.com",
      phone: "(21) 99876-5432",
      age: 45,
      height: 1.75,
      cpf: "987.654.321-11",
      weight: 82,
      sleep: "Moderada",
      vision: "Usa óculos",
      hearing: "Leve perda",
      alcoholic: "Socialmente",
      smoker: "Não",
      medicines: "Losartana",
      specificMedicines: "Hipertensão",
      physicalActivity: "Academia 2x semana",
      fallHistory: "Sim",
      reason: "Tontura",
      location: "Banheiro"
    },
    {
      name: "Fernanda Lima",
      email: "fernanda.lima@email.com",
      phone: "(31) 98888-1122",
      age: 28,
      height: 1.70,
      cpf: "456.789.123-99",
      weight: 68,
      sleep: "Boa",
      vision: "Sem correção",
      hearing: "Normal",
      alcoholic: "Não",
      smoker: "Não",
      medicines: "Anticoncepcional",
      specificMedicines: "Controle hormonal",
      physicalActivity: "Pilates",
      fallHistory: "Não",
      reason: "",
      location: ""
    },
    {
      name: "João Pedro",
      email: "joao.pedro@email.com",
      phone: "(41) 97777-3344",
      age: 35,
      height: 1.80,
      cpf: "741.852.963-00",
      weight: 90,
      sleep: "Ruim",
      vision: "Usa lentes",
      hearing: "Normal",
      alcoholic: "Regularmente",
      smoker: "Sim",
      medicines: "Rivotril",
      specificMedicines: "Ansiedade",
      physicalActivity: "Corrida",
      fallHistory: "Sim",
      reason: "Desatenção",
      location: "Rua"
    },
    {
      name: "Mariana Rocha",
      email: "mariana.rocha@email.com",
      phone: "(51) 96666-7788",
      age: 50,
      height: 1.60,
      cpf: "852.963.741-22",
      weight: 70,
      sleep: "Boa",
      vision: "Usa óculos",
      hearing: "Normal",
      alcoholic: "Não",
      smoker: "Não",
      medicines: "Metformina",
      specificMedicines: "Diabetes",
      physicalActivity: "Hidroginástica",
      fallHistory: "Sim",
      reason: "Fraqueza",
      location: "Cozinha"
    }
  ];  
  

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
              <th>sleep</th>
            </tr>
          </thead>
          <tbody>
            {pacientesTese.map((paciente) => (
              <tr key={paciente.phone}>
                 <td>id</td>
                <td>{paciente.name}</td>
                <td>{paciente.email}</td>
                <td>{paciente.phone}</td>
                <td>{paciente.age}</td>
                <td>{paciente.height}</td>
                <td>{paciente.weight}</td>
                <td>{paciente.sleep}</td>
                <td><button> Excluir</button></td>
                <td><button> Editar</button></td>
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

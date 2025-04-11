import { useEffect, useState } from 'react';
import { Container, Button, Table, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { InterfaceDadosAvaliacao, InterfaceRegistration, InterfaceSarcFAvaliacao } from '../../types';
import { exportarPacientesParaExcel } from '../../utils/exportarExcel';
import './PatientManagement.css';

export function PatientManagement() {
  const [pacientes, setPacientes] = useState<InterfaceRegistration[]>([]);
  const [dadosAvaliacao, setDadosAvaliacao] = useState<InterfaceDadosAvaliacao[]>([]);
  const [sarcFResult, setSarcFResult] = useState<InterfaceSarcFAvaliacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  console.log(dadosAvaliacao, sarcFResult)

  // Columns configuration for the table
  const columns = [
    { key: 'name', label: 'Nome' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Telefone' },
    { key: 'age', label: 'Idade' },
    { key: 'height', label: 'Altura (cm)' },
    { key: 'weight', label: 'Peso (kg)' },
    { key: 'sleep', label: 'Sono' },
    { key: 'vision', label: 'Visão' },
    { key: 'hearing', label: 'Audição' },
    { key: 'alcoholic', label: 'Alcoólatra' },
    { key: 'smoker', label: 'Fumante' },
    { key: 'medicines', label: 'Medicamentos' },
    { key: 'specificMedicines', label: 'Med. Específicos' },
    { key: 'physicalActivity', label: 'Atividade Física' },
    { key: 'fallHistory', label: 'Quedas' },
    { key: 'reason', label: 'Motivo' },
    { key: 'location', label: 'Localização' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Load all data from localStorage
        const patientData = loadLocalStorageData<InterfaceRegistration>('patient_registration');
        const avaliacaoData = loadLocalStorageData<InterfaceDadosAvaliacao>('dadosAvaliacao');
        const sarcFData = loadLocalStorageData<InterfaceSarcFAvaliacao>('sarcFResult');

        setPacientes(patientData);
        setDadosAvaliacao(avaliacaoData);
        setSarcFResult(sarcFData);
        
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Erro ao carregar dados dos pacientes');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to load and parse localStorage data
  const loadLocalStorageData = <T,>(key: string): T[] => {
    const data = localStorage.getItem(key);
    if (!data) return [];
    
    const parsed = JSON.parse(data);
    return Array.isArray(parsed?.data) ? parsed.data : [parsed?.data].filter(Boolean);
  };

  const handleDelete = (phone: string) => {
    if (window.confirm('Tem certeza que deseja excluir este paciente?')) {
      const updatedPatients = pacientes.filter(p => p.phone !== phone);
      setPacientes(updatedPatients);
      localStorage.setItem('patient_registration', JSON.stringify({ data: updatedPatients }));
    }
  };

  const handleEdit = (phone: string) => {
    navigate(`/editar-paciente/${phone}`);
  };

  const handleViewAssessments = (phone: string) => {
    navigate(`/avaliacoes-paciente/${phone}`);
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4 patient-management-container">
      <header className="text-center mb-4">
        <h1>Gerenciamento de Pacientes</h1>
        <p className="text-muted">Visualize e gerencie todos os pacientes cadastrados</p>
      </header>

      {pacientes.length === 0 ? (
        <Alert variant="info" className="text-center">
          Nenhum paciente cadastrado ainda.
        </Alert>
      ) : (
        <>
          <div className="table-responsive">
            <Table striped bordered hover className="mt-4">
              <thead>
                <tr>
                  <th>#</th>
                  {columns.map((col) => (
                    <th key={col.key}>{col.label}</th>
                  ))}
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {pacientes.map((paciente, index) => (
                  <tr key={paciente.phone}>
                    <td>{index + 1}</td>
                    {columns.map((col) => (
                      <td key={`${paciente.phone}-${col.key}`}>
                        {formatCellValue(paciente[col.key as keyof InterfaceRegistration])}
                      </td>
                    ))}
                    <td>
                      <div className="d-flex gap-2 justify-content-center">
                        <Button 
                          variant="danger" 
                          size="sm" 
                          onClick={() => handleDelete(paciente.phone!)}
                          title="Excluir"
                        >
                          Excluir
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <div className="d-flex justify-content-between mt-4">
            <Button
              variant="primary"
              onClick={() => navigate('/cadastro-paciente')}
              className="me-2"
            >
              <i className="bi bi-plus-lg me-2"></i> Cadastrar Novo Paciente
            </Button>
            
            <Button
              variant="success"
              onClick={() => exportarPacientesParaExcel(pacientes)}
            >
              <i className="bi bi-file-earmark-excel me-2"></i> Exportar para Excel
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}

// Helper function to format cell values
const formatCellValue = (value: any): string => {
  if (value === undefined || value === null) return '-';
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'boolean') return value ? 'Sim' : 'Não';
  return String(value);
};
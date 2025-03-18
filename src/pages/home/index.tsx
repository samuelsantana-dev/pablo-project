import { useNavigate } from "react-router-dom";

export function Home() {
    const navigate = useNavigate();
  
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Bem-vindo ao Sistema</h1>
        <p>Escolha uma opção:</p>
        <button onClick={() => navigate("/cadastro-paciente")}>Cadastro de Pacientes</button>
        <button onClick={() => navigate("/gestao-pacientes")}>Gestão de Pacientes</button>
        <button onClick={() => navigate("/laudo-sarcopenia")}>Laudo de Sarcopenia</button>
      </div>
    );
  }
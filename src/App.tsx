import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { SarcopeniaAssessment } from "./pages/laudo_sarcopenia/laudo_sarcopenia";
import { RegistrationPatient } from "./pages/cadastro_paciente";
import { PatientManagement } from "./pages/gestao_pacientes";
import { Home } from "./pages/home";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro-paciente" element={<RegistrationPatient />} />
        <Route path="/gestao-pacientes" element={<PatientManagement />} />
        <Route path="/laudo-sarcopenia" element={<SarcopeniaAssessment />} />
        <Route path="*" element={<h1>Página não encontrada</h1>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

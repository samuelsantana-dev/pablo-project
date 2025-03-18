import { useState } from 'react'
// import {RegistrationPatient} from './pages/cadastro_paciente';
import './App.css'
import { Header } from './components/header';
import { Footer } from './components/footer';
import { PatientManagement } from './pages/gestao_pacientes';
import { SarcopeniaAssessment } from './pages/laudo_sarcopenia/laudo_sarcopenia';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      {/* <RegistrationPatient /> */}
      {/* <PatientManagement /> */}
      <SarcopeniaAssessment />
      <Footer />
    </>
  )
}

export default App

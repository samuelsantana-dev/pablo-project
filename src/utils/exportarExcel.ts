import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface Paciente {
  phone: string;
  registro?: any;
  avaliacoes?: any[];
  sarcopenia?: any[];
}

export function exportarPacientesParaExcel(pacientes: Paciente[]) {
  const data = pacientes.map((paciente) => {
    const r = paciente.registro || {};

    return {
      Nome: r.name || '',
      Telefone: paciente.phone,
      Email: r.email || '',
      CPF: r.cpf || '',
      'Data de Nascimento': r.birthdate || '',
      Idade: r.age || '',
      Altura: r.height || '',
      Peso: r.weight || '',
      Sono: r.sleep || '',
      Visão: r.vision || '',
      Audição: r.hearing || '',
      Alcoólatra: r.alcoholic || '',
      Fumante: r.smoker || '',
      Medicamentos: r.medicines || '',
      'Medicamentos Específicos': Array.isArray(r.specificMedicines)
        ? r.specificMedicines.join(', ')
        : r.specificMedicines || '',
      'Atividade Física': r.physicalActivity || '',
      'Histórico de Quedas': r.fallHistory || '',
      Motivo: r.reason || '',
      Localização: r.location || '',

      // Extra: pegar avaliação física mais recente
      'Última Avaliação - Data': paciente.avaliacoes?.[0]?.date || '',
      'Última Avaliação - Força Preensão': paciente.avaliacoes?.[0]?.forcaPreensao || '',
      'Última Avaliação - TUG': paciente.avaliacoes?.[0]?.tug || '',
      'Última Avaliação - Ângulo de Fase': paciente.avaliacoes?.[0]?.anguloDeFase || '',
      'Última Avaliação - Sentar-Levantar': paciente.avaliacoes?.[0]?.sentarLevantar || '',
      'Última Avaliação - Panturrilha': paciente.avaliacoes?.[0]?.panturrilha || '',

      // Extra: pegar último teste Sarc-F
      'Último Sarc-F - Data': paciente.sarcopenia?.[0]?.date || '',
      'Último Sarc-F - Pontuação': paciente.sarcopenia?.[0]?.pontuacao || '',
      'Último Sarc-F - Resultado': paciente.sarcopenia?.[0]?.predicao || '',
      'Último Sarc-F - Força': paciente.sarcopenia?.[0]?.respostas?.forca || '',
      'Último Sarc-F - Apoio': paciente.sarcopenia?.[0]?.respostas?.apoio || '',
      'Último Sarc-F - Levantar': paciente.sarcopenia?.[0]?.respostas?.levantar || '',
      'Último Sarc-F - Escadas': paciente.sarcopenia?.[0]?.respostas?.escadas || '',
      'Último Sarc-F - Quedas': paciente.sarcopenia?.[0]?.respostas?.quedas || '',
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Pacientes');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

  saveAs(blob, 'pacientes_completos.xlsx');
}

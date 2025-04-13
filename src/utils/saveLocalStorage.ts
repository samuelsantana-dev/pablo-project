/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetPhoneUser } from "./getPhoneUser";

export function salvarNoLocalStorage(chave: string, data: object) {
  try {
    const phone = GetPhoneUser();

    const dadosComPhone = phone ? { ...data, phone } : data;

    const dadosFormatados = JSON.stringify({ data: dadosComPhone });
    localStorage.setItem(chave, dadosFormatados);
    
    saveTable();
  } catch (erro) {
    console.error('Erro ao salvar no localStorage:', erro);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function saveUnicData(chave: string, unicData: any) {
  localStorage.setItem(chave, unicData);
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function saveTable() {
  try {
    const sarcopeniaData = localStorage.getItem('sarcFResult');
    const avaliacaoData = localStorage.getItem('dadosAvaliacao');
    const registrationData = localStorage.getItem('patient_registration');

    const listaUnificada: any[] = [];

    const adicionarOuAtualizar = (phone: string, name: string, tipo: string, valor: any) => {
      const index = listaUnificada.findIndex(p => p.phone === phone);

      if (index !== -1) {
        if (tipo === 'registro') {
          listaUnificada[index][tipo] = valor;
        } else {
          if (!listaUnificada[index][tipo]) listaUnificada[index][tipo] = [];
          listaUnificada[index][tipo].push(valor);
        }
      } else {
        listaUnificada.push({
          phone,
          name,
          [tipo]: tipo === 'registro' ? valor : [valor],
        });
      }
    };

    if (sarcopeniaData) {
      const { data } = JSON.parse(sarcopeniaData);
      if (data?.phone) {
        adicionarOuAtualizar(data.phone, data.name, 'sarcopenia', data);
      }
    }

    if (avaliacaoData) {
      const { data } = JSON.parse(avaliacaoData);
      if (data?.phone) {
        adicionarOuAtualizar(data.phone, data.name, 'avaliacoes', data);
      }
    }

    if (registrationData) {
      const { data } = JSON.parse(registrationData);
      if (data?.phone) {
        adicionarOuAtualizar(data.phone, data.name, 'registro', data);
      }
    }

    localStorage.setItem('user_table', JSON.stringify(listaUnificada));
    console.log('Dados unificados salvos em user_table:', listaUnificada);
  } catch (erro) {
    console.error('Erro ao salvar na tabela user_table:', erro);
  }
}



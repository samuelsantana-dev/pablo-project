import { GetPhoneUser } from "./getPhoneUser";

export function salvarNoLocalStorage(chave: string, data: object) {
    try {

      const phone = GetPhoneUser();

      if (phone) {
        console.log('phone', phone);
  
        const dadosComPhone = {
          ...data,
          phone,
        };
  
        const dadosFormatados = JSON.stringify({ data: dadosComPhone });
        localStorage.setItem(chave, dadosFormatados);
        saveTable(dadosFormatados);
        return;
      }

      const dadosFormatados = JSON.stringify({ data });
      localStorage.setItem(chave, dadosFormatados);
    } catch (erro) {
      console.error('Erro ao salvar no localStorage:', erro);
    }
  }



  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function saveUnicData(chave: string, unicData: any){
    localStorage.setItem(chave, unicData);
  }

  export function saveTable(dadosFormatados: string) {
    localStorage.setItem('user_table', dadosFormatados);
  }
  
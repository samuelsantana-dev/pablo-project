export function salvarNoLocalStorage(chave: string, data: object) {
    try {
      const dadosFormatados = JSON.stringify({ data });
      localStorage.setItem(chave, dadosFormatados);
    } catch (erro) {
      console.error('Erro ao salvar no localStorage:', erro);
    }
  }


  export function saveUnicData(chave: string, unicData: any){
    localStorage.setItem(chave, unicData);
  }
  
export function salvarNoLocalStorage(chave: string, dados: any): void {
    try {
      const dadosFormatados = JSON.stringify({dados});
      localStorage.setItem(chave, dadosFormatados);
    } catch (erro) {
      console.error('Erro ao salvar no localStorage:', erro);
    }
  }


  export function saveUnicData(chave: string, unicData: any){
    localStorage.setItem(chave, unicData);
  }
  
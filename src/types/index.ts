export interface InterfacePatientRegistration {
    id: number;
    name: string;
    
    email: string;
    phone: string;
    birthdate: string;
    age: number;
    height: number;
    weight: number;
    cpf: string | null;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }


  export interface InterfaceRegistration {
      name?: string;
      email?: string;
      phone?: string;
      birthdate?: string;
      age?: string;
      height?: string;
      cpf?: string;
      weight?: string;
      sleep?: string;
      vision?: string;
      hearing?: string;
      alcoholic?: string;
      smoker?: string;
      medicines?: string;
      specificMedicines?: string | string[];
      physicalActivity?: string;
      fallHistory?: string;
      reason?: string;
      location?: string;
  }


  export interface InterfaceDadosAvaliacao {
    forcaPreensao: number;
    tug: number;
    tugAjustada: number;
    anguloDeFase: number;
    sentarLevantar: number;
    panturrilha: number;
    sexo: 'Masculino' | 'Feminino' | string;
  }
  
  export interface InterfaceSarcFAvaliacao {
    forca?: string | number | null;
    apoio?: string | number | null;
    levantar?: string | number | null;
    escadas?: string | number | null;
    quedas?: string | number | null;
  }
  

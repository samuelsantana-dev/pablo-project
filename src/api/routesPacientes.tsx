const urlApi = 'http://localhost:1337/api/pacientes';

export async function getPatients() {
    const response = await fetch(urlApi);
    const pacientes = await response.json();
    return pacientes.data;
}

export async function RegisterPatient(data: any){
    const response = await fetch(urlApi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
}
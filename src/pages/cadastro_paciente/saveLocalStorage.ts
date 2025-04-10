export function registrationSave({data}: any){
    localStorage.setItem('registration_patient', data);
}
import { Patient } from '../../entities/Patient';

export interface IGetPatientRepository {
    getPatients(): Promise<Array<Patient>>;
}

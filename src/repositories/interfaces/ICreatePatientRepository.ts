/* eslint-disable no-unused-vars */
import { Patient } from '../../entities/Patient';

export interface ICreatePatientRepository {
  checkIfPatientExistsByEmail(email: string): Promise<boolean>;

  savePatient(patient: Patient): Promise<void>;
}

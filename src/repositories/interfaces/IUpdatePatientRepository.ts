/* eslint-disable no-unused-vars */
import { Patient } from '../../entities/Patient';

export interface IUpdatePatientRepository {
    checkIfPatientExistsByEmail(email: string): Promise<boolean>;

    updatePatient(item: Object, email: string): Promise<void>;
}

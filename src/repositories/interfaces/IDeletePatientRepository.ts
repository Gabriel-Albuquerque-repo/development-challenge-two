/* eslint-disable no-unused-vars */
export interface IDeletePatientRepository {
    deletePatient(email: string): Promise<void>;
}

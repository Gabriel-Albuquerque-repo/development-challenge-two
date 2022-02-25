import { IDeletePatientRepository } from '../../repositories/interfaces';
import IDeletePatientRequestDTO from './DeletePatientRequestDTO';

class DeletePatientUseCase {
    private deletePatientRepository: IDeletePatientRepository;

    constructor(deletePatientRepository: IDeletePatientRepository) {
        this.deletePatientRepository = deletePatientRepository;
    }

    async execute(deletePatientRequestData: IDeletePatientRequestDTO) {
        const { email } = deletePatientRequestData;

        await this.deletePatientRepository.deletePatient(email);
    }
}

export default DeletePatientUseCase;

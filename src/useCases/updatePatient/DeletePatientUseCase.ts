import { IUpdatePatientRepository } from '../../repositories/interfaces';
import TUpdatePatientRequestDTO from './UpdatePatientRequestDTO';
import { NotFoundError } from '../../helpers/errors';

class UpdatePatientUseCase {
    private updatePatientRepository: IUpdatePatientRepository;

    constructor(updatePatientRepository: IUpdatePatientRepository) {
        this.updatePatientRepository = updatePatientRepository;
    }

    async execute(updatePatientRequestData: TUpdatePatientRequestDTO) {
        const { name, birthDate, email, address } = updatePatientRequestData;

        const PatientAlreadyExists: boolean =
            await this.updatePatientRepository.checkIfPatientExistsByEmail(
                email
            );

        if (PatientAlreadyExists === false) {
            throw new NotFoundError(
                'There is no Patient account with that email'
            );
        }

        await this.updatePatientRepository.updatePatient(
            { name, birthDate, address },
            email
        );
    }
}

export default UpdatePatientUseCase;

import { Patient } from '../../entities/Patient';
import { ICreatePatientRepository } from '../../repositories/interfaces';
import ICreatePatientRequestDTO from './CreatePatientRequestDTO';
import { ConflictError } from '../../helpers/errors';

class CreatePatientUseCase {
    private createPatientRepository: ICreatePatientRepository;

    constructor(createPatientRepository: ICreatePatientRepository) {
        this.createPatientRepository = createPatientRepository;
    }

    async execute(createPatientRequestData: ICreatePatientRequestDTO) {
        const { name, birthDate, email, address } = createPatientRequestData;

        const PatientAlreadyExists: boolean =
            await this.createPatientRepository.checkIfPatientExistsByEmail(
                email
            );

        if (PatientAlreadyExists === true) {
            throw new ConflictError(
                'There is an Patient account with that email'
            );
        }

        const newPatient = new Patient({
            name,
            birthDate,
            email,
            address,
        });

        await this.createPatientRepository.savePatient(newPatient);
    }
}

export default CreatePatientUseCase;

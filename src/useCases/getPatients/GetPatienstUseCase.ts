import { IGetPatientRepository } from '../../repositories/interfaces';

class GetPatientsUseCase {
    private getPatientRepository: IGetPatientRepository;

    constructor(getPatientRepository: IGetPatientRepository) {
        this.getPatientRepository = getPatientRepository;
    }

    async execute() {
        const patients = await this.getPatientRepository.getPatients();

        return patients;
    }
}

export default GetPatientsUseCase;

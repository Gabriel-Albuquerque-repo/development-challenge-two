import { UpdatePatientDynamoRepository } from '../../repositories/implementations/dynamoDB/UpdatePatientDynamoRepository';
import UpdatePatientUseCase from './DeletePatientUseCase';

const updatePatientDynamoRepository = new UpdatePatientDynamoRepository();

const updatePatientUseCase = new UpdatePatientUseCase(
    updatePatientDynamoRepository
);

export default updatePatientUseCase;

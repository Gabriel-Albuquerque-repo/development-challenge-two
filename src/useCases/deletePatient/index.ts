import { DeletePatientDynamoRepository } from '../../repositories/implementations/dynamoDB';
import DeletePatientUseCase from './DeletePatientUseCase';

const deletePatientDynamoRepository = new DeletePatientDynamoRepository();

const deletePatientUseCase = new DeletePatientUseCase(
    deletePatientDynamoRepository
);

export default deletePatientUseCase;

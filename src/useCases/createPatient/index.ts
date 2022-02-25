import { CreatePatientDynamoRepository } from '../../repositories/implementations/dynamoDB';
import CreatePatientUseCase from './CreatePatientUseCase';

const createPatientDynamoRepository = new CreatePatientDynamoRepository();

const createPatientUseCase = new CreatePatientUseCase(
    createPatientDynamoRepository
);

export default createPatientUseCase;

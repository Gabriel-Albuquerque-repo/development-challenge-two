import { GetPatientsDynamoRepository } from '../../repositories/implementations/dynamoDB';
import GetPatientsUseCase from './GetPatienstUseCase';

const getPatientRepository = new GetPatientsDynamoRepository();

const getPatientsUseCase = new GetPatientsUseCase(getPatientRepository);

export default getPatientsUseCase;

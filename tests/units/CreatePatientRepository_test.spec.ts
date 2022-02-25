import { config } from 'dotenv';
import { CreatePatientDynamoRepository } from '../../src/repositories/implementations/dynamoDB';
import { Patient, TPatientProps } from '../../src/entities/Patient';

config({ path: '.env.test' });

describe('unit tests: create patient repository', () => {
    let createPatientDynamoRepository: CreatePatientDynamoRepository;

    beforeAll(() => {
        createPatientDynamoRepository = new CreatePatientDynamoRepository();
    });

    test('check by email if the patient already exists', async () => {
        const responseFromExitsId =
            await createPatientDynamoRepository.checkIfPatientExistsByEmail(
                'loremipsum@gmail.com'
            );

        expect(responseFromExitsId).toBe(false);
    });

    test('save patient', async () => {
        const patientData: TPatientProps = {
            name: 'Lorem Ipsum',
            birthDate: '21-02-2022',
            email: 'loremipsum@gmail.com',
            address: 'Lorem Ipsum 546, B',
        };

        const newPatient = new Patient(patientData);

        const responseFromSavePatient =
            await createPatientDynamoRepository.savePatient(newPatient);

        expect(responseFromSavePatient).toBeUndefined();
    });
});

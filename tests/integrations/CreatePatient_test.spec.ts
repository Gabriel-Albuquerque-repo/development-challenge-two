import { config } from 'dotenv';
import { APIGatewayProxyResult } from 'aws-lambda';
import { handler } from '../../src/lambdas/CreatePatient';
import { EventGeneratorFromGatewayEvent } from '../helpers/EventGenerator';
import { TPatientProps } from '../../src/entities/Patient';

config({ path: '.env.test' });

describe('integration tests: create patient', () => {
    test('it should return a 201 with sucessfully message', async () => {
        const patientData: TPatientProps = {
            name: 'Create Patient int test',
            birthDate: '21-02-2022',
            email: 'createpatientinttest@gmail.com',
            address: 'Create Patient, 55, B',
        };
        const eventGenerator = new EventGeneratorFromGatewayEvent(patientData);

        const fullEvent = eventGenerator.getFullEvent;

        const response: APIGatewayProxyResult = await handler(fullEvent);

        const bodyResponse = JSON.parse(response.body);

        expect(response.statusCode).toBe(201);
        expect(bodyResponse).toEqual({
            message: 'Successfully create patient',
        });
    });

    test('it should return a 409 with conflict error', async () => {
        const patientData: TPatientProps = {
            name: 'Create Patient int test',
            birthDate: '21-02-2022',
            email: 'createpatientinttest@gmail.com',
            address: 'Create Patient, 55, B',
        };

        const eventGenerator = new EventGeneratorFromGatewayEvent(patientData);

        const fullEvent = eventGenerator.getFullEvent;

        const response: APIGatewayProxyResult = await handler(fullEvent);

        const bodyResponse = JSON.parse(response.body);

        expect(response.statusCode).toBe(409);
        expect(bodyResponse).toEqual({
            errorClassName: 'ConflictError',
            generalErrorMessage: 'Failed to add data or files',
            mainErrorMessage: 'There is an Patient account with that email',
        });
    });
});

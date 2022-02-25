import { config } from 'dotenv';
import { APIGatewayProxyResult } from 'aws-lambda';
import { handler as handlerCreate } from '../../src/lambdas/CreatePatient';
import { handler as handlerUpdate } from '../../src/lambdas/UpdatePatient';
import { EventGeneratorFromGatewayEvent } from '../helpers/EventGenerator';
import { TPatientProps } from '../../src/entities/Patient';

config({ path: '.env.test' });

type TUpdatePatientRequestDTO = {
    name?: string;
    email: string;
    address: string;
};

describe('integration tests: update patient', async () => {
    test('it should return a 200 with sucessfully message', async () => {
        const patientHandlerCreate: TPatientProps = {
            name: 'Create Test',
            birthDate: '21-02-2022',
            email: 'updatepatientint@gmail.com',
            address: 'Delete Patient, 55, A',
        };

        const eventGenerator = new EventGeneratorFromGatewayEvent(
            patientHandlerCreate
        );

        let fullEvent = eventGenerator.getFullEvent;

        await handlerCreate(fullEvent);

        const patientHandlerDelete: TUpdatePatientRequestDTO = {
            name: 'Update Test',
            email: 'updatepatientint@gmail.com',
            address: 'Update Patient, 59, C',
        };

        eventGenerator.changeBody = patientHandlerDelete;

        fullEvent = eventGenerator.getFullEvent;

        const response: APIGatewayProxyResult = await handlerUpdate(fullEvent);

        expect(response.statusCode).toBe(200);
        expect(response).toEqual({ message: 'Successfully update patient' });
    });
});

import { config } from 'dotenv';
import { APIGatewayProxyResult } from 'aws-lambda';
import { handler as handlerCreate } from '../../src/lambdas/CreatePatient';
import { handler as handlerGet } from '../../src/lambdas/GetPatients';
import { EventGeneratorFromGatewayEvent } from '../helpers/EventGenerator';
import { TPatientProps } from '../../src/entities/Patient';

config({ path: '.env.test' });

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

        const fullEvent = eventGenerator.getFullEvent;

        await handlerCreate(fullEvent);

        const response: APIGatewayProxyResult = await handlerGet(fullEvent);

        expect(response.statusCode).toBe(200);
        expect(response).toEqual({
            message: 'Successfully update patient',
            patiens: [
                {
                    name: 'Create Test',
                    birthDate: '21-02-2022',
                    email: 'updatepatientint@gmail.com',
                    address: 'Delete Patient, 55, A',
                },
            ],
        });
    });
});

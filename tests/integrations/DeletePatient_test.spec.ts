import { config } from 'dotenv';
import { APIGatewayProxyResult } from 'aws-lambda';
import { handler as handlerCreate } from '../../src/lambdas/CreatePatient';
import { handler as handlerDelete } from '../../src/lambdas/DeletePatient';
import { EventGeneratorFromGatewayEvent } from '../helpers/EventGenerator';
import { TPatientProps } from '../../src/entities/Patient';

type TPatientHandlerDelete = {
    email: string;
};

config({ path: '.env.test' });

describe('integration tests: delete patient', () => {
    test('it should return a 200 with sucessfully message', async () => {
        const patientHandlerCreate: TPatientProps = {
            name: 'Delete Teste',
            birthDate: '21-02-2022',
            email: 'deletepatientint@gmail.com',
            address: 'Delete Patient, 55, A',
        };

        const eventGenerator = new EventGeneratorFromGatewayEvent(
            patientHandlerCreate
        );

        let fullEvent = eventGenerator.getFullEvent;

        await handlerCreate(fullEvent);

        const patientHandlerDelete: TPatientHandlerDelete = {
            email: 'deletepatientint@gmail.com',
        };

        eventGenerator.changeBody = patientHandlerDelete;

        fullEvent = eventGenerator.getFullEvent;

        const response: APIGatewayProxyResult = await handlerDelete(fullEvent);

        expect(response.statusCode).toBe(200);
        expect(response).toEqual({ message: 'Successfully delete patient' });
    });
});

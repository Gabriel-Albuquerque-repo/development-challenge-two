import {
    APIGatewayProxyEventV2WithRequestContext,
    APIGatewayProxyResult,
} from 'aws-lambda';
import { CreatePatientValidation } from '../utils/validations';
import { TPatientProps } from '../entities/Patient';
import createPatientUseCase from '../useCases/createPatient';

interface IParsedfromEventBody {
    [name: string]: any;
}

export const handler = async (
    event: APIGatewayProxyEventV2WithRequestContext<any>
): Promise<APIGatewayProxyResult> => {
    const response: APIGatewayProxyResult = {
        isBase64Encoded: false,
        statusCode: 201,
        headers: {
            'content-type': 'application/json',
        },
        body: '',
    };

    const parsedBody: IParsedfromEventBody = JSON.parse(event.body);

    try {
        const createPatientValidation = new CreatePatientValidation(parsedBody);

        const createPatientPayloadValidated: TPatientProps =
            await createPatientValidation.validateInput();

        await createPatientUseCase.execute(createPatientPayloadValidated);

        response.body = JSON.stringify({
            message: 'Successfully create patient',
        });
    } catch (error) {
        response.statusCode = error.code;
        response.body = JSON.stringify({
            errorClassName: error.name,
            generalErrorMessage: error.generalErrorMessage,
            mainErrorMessage: error.mainErrorMessage,
        });
    }

    return response;
};

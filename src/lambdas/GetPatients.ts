import {
    APIGatewayProxyEventV2WithRequestContext,
    APIGatewayProxyResult,
} from 'aws-lambda';
import getPatientsUseCase from '../useCases/getPatients';

export const handler = async (
    // eslint-disable-next-line no-unused-vars
    event: APIGatewayProxyEventV2WithRequestContext<any>
): Promise<APIGatewayProxyResult> => {
    const response: APIGatewayProxyResult = {
        isBase64Encoded: false,
        statusCode: 200,
        headers: {
            'content-type': 'application/json',
        },
        body: '',
    };

    try {
        const patientsFromUseCase = await getPatientsUseCase.execute();

        response.body = JSON.stringify({
            message: 'Successfully get patients',
            patients: patientsFromUseCase,
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

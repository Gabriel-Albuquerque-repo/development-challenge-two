import {
    APIGatewayProxyEventV2WithRequestContext,
    APIGatewayProxyResult,
} from 'aws-lambda';
import { DeletePatientValidation } from '../utils/validations';
import deletePatientUseCase from '../useCases/deletePatient';
import TDeletePatientRequestDTO from '../useCases/deletePatient/DeletePatientRequestDTO';

interface IParsedfromEventBody {
    [name: string]: any;
}

export const handler = async (
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
    const parsedBody: IParsedfromEventBody = JSON.parse(event.body);

    try {
        const deletePatientValidation = new DeletePatientValidation(parsedBody);

        const deletePatientPayloadValidated: TDeletePatientRequestDTO =
            await deletePatientValidation.validateInput();

        await deletePatientUseCase.execute(deletePatientPayloadValidated);

        response.body = JSON.stringify({
            message: 'Successfully delete patient',
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

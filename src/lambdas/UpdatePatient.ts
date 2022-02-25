import {
    APIGatewayProxyEventV2WithRequestContext,
    APIGatewayProxyResult,
} from 'aws-lambda';
import { UpdatePatientValidation } from '../utils/validations';
import { TPatientProps } from '../entities/Patient';
import updatePatientUseCase from '../useCases/updatePatient';

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
        const updatePatientValidation = new UpdatePatientValidation(parsedBody);

        const updatePatientPayloadValidated: TPatientProps =
            await updatePatientValidation.validateInput();

        await updatePatientUseCase.execute(updatePatientPayloadValidated);

        response.body = JSON.stringify({
            message: 'Successfully update patient',
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

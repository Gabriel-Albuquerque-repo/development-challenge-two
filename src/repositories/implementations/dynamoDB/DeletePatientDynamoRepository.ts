import {
    DocumentClient,
    AttributeValue,
    DeleteItemInput,
} from 'aws-sdk/clients/dynamodb';
import { IDeletePatientRepository } from '../../interfaces';
import { DynamoDocumentClientCredentials } from '../../../helpers/database/DynamoDocumentClient';

export class DeletePatientDynamoRepository
    extends DynamoDocumentClientCredentials
    implements IDeletePatientRepository
{
    private dynamoClientDB: DocumentClient;

    constructor() {
        super();
        this.dynamoClientDB = super.getDynamoClient();
    }

    public async deletePatient(email: string): Promise<void> {
        const deletePatientParams: DeleteItemInput = {
            TableName: process.env.PATIENTS_TABLE_NAME,
            Key: {
                email: email as AttributeValue,
            },
        };

        await this.dynamoClientDB.delete(deletePatientParams).promise();
    }
}

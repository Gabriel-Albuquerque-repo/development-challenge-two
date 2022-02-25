import { DocumentClient, ScanInput } from 'aws-sdk/clients/dynamodb';
import { Patient } from '../../../entities/Patient';
import { IGetPatientRepository } from '../../interfaces';
import { DynamoDocumentClientCredentials } from '../../../helpers/database/DynamoDocumentClient';

export class GetPatientsDynamoRepository
    extends DynamoDocumentClientCredentials
    implements IGetPatientRepository
{
    private dynamoClientDB: DocumentClient;

    constructor() {
        super();
        this.dynamoClientDB = super.getDynamoClient();
    }

    public async getPatients(): Promise<Array<Patient>> {
        const scanPatientsParams: ScanInput = {
            TableName: process.env.PATIENTS_TABLE_NAME,
            AttributesToGet: ['name', 'birthDate', 'email', 'address'],
        };

        const { Items } = await this.dynamoClientDB
            .scan(scanPatientsParams)
            .promise();

        return Items;
    }
}

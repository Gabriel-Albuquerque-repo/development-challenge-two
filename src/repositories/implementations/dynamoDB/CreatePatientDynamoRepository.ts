import { AWSError } from 'aws-sdk';
import {
  DocumentClient,
  QueryInput,
  AttributeValue,
  QueryOutput,
  PutItemInput,
  PutItemInputAttributeMap,
} from 'aws-sdk/clients/dynamodb';
import { Patient } from '../../../entities/Patient';
import { ICreatePatientRepository } from '../../interfaces';
import { DynamoDocumentClientCredentials } from '../../../helpers/database/DynamoDocumentClient';

export class CreatePatientDynamoRepository
  extends DynamoDocumentClientCredentials
  implements ICreatePatientRepository
{
  private dynamoClientDB: DocumentClient;

  constructor() {
    super();
    this.dynamoClientDB = super.getDynamoClient();
  }

  public async checkIfPatientExistsByEmail(email: string): Promise<boolean> {
    const queryPatientParams: QueryInput = {
      TableName: process.env.PATIENTS_TABLE_NAME,
      KeyConditionExpression: '#email = :email',
      ExpressionAttributeNames: {
        '#email': 'email',
      },
      ExpressionAttributeValues: {
        ':email': email as AttributeValue,
      },
    };

    const checkInDynamoIfExists: QueryOutput | AWSError =
      await this.dynamoClientDB.query(queryPatientParams).promise();

    if (checkInDynamoIfExists.Count === 1) {
      return true;
    }

    return false;
  }

  public async savePatient(patient: Patient): Promise<void> {
    const newPatientParamsToPut: PutItemInput = {
      TableName: process.env.PATIENTS_TABLE_NAME,
      Item: patient as PutItemInputAttributeMap,
    };

    await this.dynamoClientDB.put(newPatientParamsToPut).promise();
  }
}

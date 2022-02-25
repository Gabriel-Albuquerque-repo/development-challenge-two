/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { AWSError } from 'aws-sdk';
import {
    DocumentClient,
    AttributeValue,
    UpdateItemInput,
    QueryOutput,
    QueryInput,
} from 'aws-sdk/clients/dynamodb';
import { IUpdatePatientRepository } from '../../interfaces';
import { DynamoDocumentClientCredentials } from '../../../helpers/database/DynamoDocumentClient';

export class UpdatePatientDynamoRepository
    extends DynamoDocumentClientCredentials
    implements IUpdatePatientRepository
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

    public async updatePatient(item: Object, email: string): Promise<void> {
        let updateExpression = 'set';
        const expressionAttributeNames = {};
        const expressionAttributeValues = {};

        for (const property in item) {
            updateExpression += ` #${property} = :${property} ,`;
            expressionAttributeNames[`#${property}`] = property;
            expressionAttributeValues[`:${property}`] = item[property];
        }
        updateExpression = updateExpression.slice(0, -1);

        const updatePatientParams: UpdateItemInput = {
            TableName: process.env.PATIENTS_TABLE_NAME,
            Key: { email: email as AttributeValue },
            UpdateExpression: updateExpression,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: 'UPDATED_NEW',
        };

        await this.dynamoClientDB.update(updatePatientParams).promise();
    }
}

import Joi, { StringSchema, ObjectSchema } from 'joi';
import { ValidationError } from '../../helpers/errors';
import {} from '../../entities/Patient';

type TBodyBeforeValidate = {
    [name: string]: any;
};

export class DeletePatientValidation {
    private body: TBodyBeforeValidate;

    private email: StringSchema = Joi.string()
        .email({
            tlds: {
                allow: ['com', 'br', 'net'],
            },
        })
        .lowercase()
        .min(15)
        .max(50)
        .trim()
        .required();

    constructor(body: TBodyBeforeValidate) {
        this.body = body;
    }

    public async validateInput() {
        try {
            const createPatientValidation: ObjectSchema = Joi.object().keys({
                email: this.email,
            });

            const validatedPayload =
                await createPatientValidation.validateAsync(this.body);

            return validatedPayload;
        } catch (error) {
            const getDetailsError: string = error.details[0].message;
            const transformInFriendlyError = getDetailsError.replace(
                /"/g,
                '***'
            );

            throw new ValidationError(transformInFriendlyError);
        }
    }
}

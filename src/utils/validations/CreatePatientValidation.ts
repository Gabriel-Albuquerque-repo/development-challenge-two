import Joi, { StringSchema, Schema, ObjectSchema } from 'joi';
import { ValidationError } from '../../helpers/errors';
import {} from '../../entities/Patient';

type TBodyBeforeValidate = {
    [name: string]: any;
};

export class CreatePatientValidation {
    private body: TBodyBeforeValidate;

    private id: Schema = Joi.forbidden();

    private createdAt: Schema = Joi.forbidden();

    private updatedAt: Schema = Joi.forbidden();

    private name: StringSchema = Joi.string().required();

    // private birthdate: DateSchema = Joi.date().greater('1-1-1900').less('now');
    private birthDate: StringSchema = Joi.string().required();

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

    private address: StringSchema = Joi.string().required();

    constructor(body: TBodyBeforeValidate) {
        this.body = body;
    }

    public async validateInput() {
        try {
            const createPatientValidation: ObjectSchema = Joi.object().keys({
                id: this.id,
                createdAt: this.createdAt,
                updatedAt: this.updatedAt,
                name: this.name,
                birthDate: this.birthDate,
                email: this.email,
                address: this.address,
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

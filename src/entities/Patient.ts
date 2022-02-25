import { v4 as uuidv4 } from 'uuid';

export type TPatientProps = {
    updatedAt?: number;
    name: string;
    birthDate: string;
    email: string;
    address: string;
};

export class Patient {
    public readonly id?: string;

    public readonly createdAt?: number;

    public updatedAt?: number;

    public name?: string;

    public birthDate?: string;

    public email?: string;

    public address?: string;

    constructor(props: TPatientProps) {
        this.id = uuidv4();
        this.createdAt = Date.now();

        if (!props.updatedAt) this.updatedAt = Date.now();

        Object.assign(this, props);
    }
}

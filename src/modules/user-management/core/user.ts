import { CoreUserDTO } from "./core_user_dto";

export class User {
    private _id: string;
    private _userName: string
    private _accountNumber: string
    private _emailAddress: string
    private _identityNumber: string
    private _createdAt?: Date
    private _updatedAt?: Date

    constructor(props: CoreUserDTO) {
        this._id = props.id;
        this._userName = props.userName;
        this._accountNumber = props.accountNumber;
        this._emailAddress = props.emailAddress;
        this._identityNumber = props.identityNumber;
        this._createdAt = props.createdAt;
        this._updatedAt = props.updatedAt;
    }

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    public get userName(): string {
        return this._userName;
    }

    public set userName(value: string) {
        this._userName = value;
    }

    public get accountNumber(): string {
        return this._accountNumber;
    }

    public set accountNumber(value: string) {
        this._accountNumber = value;
    }

    public get emailAddress(): string {
        return this._emailAddress;
    }

    public set emailAddress(value: string) {
        this._emailAddress = value;
    }

    public get identityNumber(): string {
        return this._identityNumber;
    }

    public set identityNumber(value: string) {
        this._identityNumber = value;
    }

    public get createdAt(): Date | undefined {
        return this._createdAt;
    }

    public set createdAt(value: Date | undefined) {
        this._createdAt = value;
    }

    public get updatedAt(): Date | undefined {
        return this._updatedAt;
    }

    public set updatedAt(value: Date | undefined) {
        this._updatedAt = value;
    }
}
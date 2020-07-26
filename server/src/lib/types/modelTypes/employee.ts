import { Document, Model, Types } from 'mongoose';
import {
  IAccountDocument,
} from './account';
import { IFieldDocument } from './field';
import { IRanchDocument } from './ranch';
import { IJobDocument } from './job';
import { IJobLogDocument } from './joblog';
import { ICrewDocument } from './crew';

/*
* These are meant to be used for Mongoose Schemas.
* These are also used for the type of objects our resolvers returns
*/

export enum RoleType {
  MANAGER = 'MANAGER',
  INPUT_USER = 'INPUT_USER',
  FIELD_USER = 'FIELD_USER',
  SETUP_USER = 'SETUP_USER',
  WORKER = 'WORKER',
}

export interface IEmployeeDocument extends Document {
  _id: Types.ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  isAdmin?: boolean;
  role: RoleType;
  token: string;
  account: IAccountDocument;
  crews: ICrewDocument;
  fields: IFieldDocument[];
  jobs: IJobDocument[];
  jobLogs: IJobLogDocument[];
  ranches: IRanchDocument[];
  comparePassword: (password: string) => Promise<boolean>;
  getEmployeeAccount: () => Promise<IAccountDocument | null>;
}

export interface IEmployeeModel extends Model<IEmployeeDocument> {
  getEmployeeAccount: (id: string) => IAccountDocument;
}
// export interface IUserDocument extends Document {
//   _id: Types.ObjectId;
//   email: string;
//   password: string;
//   role: string;
//   admin?: boolean;
//   token: string;
//   comparePassword: (password: string) => Promise<boolean>;
//   account: IAccountDocument;
// }

// These are Graph Return Values
export interface GqlEmployee {
  id?: Types.ObjectId;
  email?: string;
  firstName?: string;
  lastName?: string;
  isAdmin?: boolean;
  role?: string;
  token?: string;
  account?: IAccountDocument;
  crews?: ICrewDocument;
  fields?: IFieldDocument[];
  ranches?: IRanchDocument[];
  jobs?: IJobDocument[];
  jobLogs?: IJobLogDocument[];
}

export type SignInInput = {
  email: string;
  password: string;
}

export type CreateEmployeeInput = {
  input: {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    role: string;
  }
}

export type SignInArgs = {
  input: SignInInput;
}

export type SignUpInput = SignInInput;

export type SignUpArgs = {
  input: SignUpInput;
}

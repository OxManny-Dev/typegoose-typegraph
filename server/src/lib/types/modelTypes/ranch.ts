import { Document } from 'mongoose';
import {
  IAccountDocument,
  ICrewDocument,
  IEmployeeDocument,
  IFieldDocument,
  IJobDocument,
  IJobLogDocument,
} from '..';

export interface IRanchDocument extends Document {
  _id: string;
  name: string;
  account: IAccountDocument;
  crews: ICrewDocument[];
  employees: IEmployeeDocument[];
  fields: IFieldDocument[];
  jobs: IJobDocument[];
  jobLogs: IJobLogDocument[];
}

export interface GqlRanch {
  _id?: string;
  name?: string;
  account: IAccountDocument;
  crews?: ICrewDocument[];
  employees?: IEmployeeDocument[];
  fields?: IFieldDocument[];
  jobs?: IJobDocument[];
  jobLogs?: IJobLogDocument[];
}

export type AddRanchInput = {
  input: {
    name: string;
  }
}

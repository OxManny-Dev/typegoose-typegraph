import { Document } from 'mongoose';
import {
  IAccountDocument,
  ICrewDocument,
  IEmployeeDocument,
  IFieldDocument,
  IJobLogDocument,
  IRanchDocument,
} from '..';

export interface IJobDocument extends Document {
  _id: string;
  name: string;
  account: IAccountDocument;
  crews: ICrewDocument[];
  employees: IEmployeeDocument[];
  fields: IFieldDocument[];
  jobLogs: IJobLogDocument[];
  ranches: IRanchDocument[];
}

export type AddJobInput = {
  input: {
    name: string;
  }
}

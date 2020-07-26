import { Document } from 'mongoose';
import {
  IRanchDocument,
  IJobDocument,
  IAccountDocument,
  IJobLogDocument,
  IEmployeeDocument, ICrewDocument,
} from '..';

export interface IFieldDocument extends Document {
  _id: string;
  name: string;
  account: IAccountDocument;
  crews: ICrewDocument[];
  employees: IEmployeeDocument[];
  jobs: IJobDocument[];
  jobLogs: IJobLogDocument[];
  ranch: IRanchDocument;
}

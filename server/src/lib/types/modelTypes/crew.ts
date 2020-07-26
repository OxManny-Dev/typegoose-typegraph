import { Document } from 'mongoose';
import {
  IAccountDocument,
  IEmployeeDocument,
  IFieldDocument,
  IJobDocument,
  IJobLogDocument,
  IRanchDocument,
} from '..';

export interface ICrewDocument extends Document {
  _id: string;
  name: string;
  account: IAccountDocument;
  crewMembers: IEmployeeDocument[];
  jobs: IJobDocument[];
  jobLogs: IJobLogDocument[];
  fields: IFieldDocument[];
  ranches: IRanchDocument[];
}

export type CreateCrewInput = {
  input: {
    crewName: string;
  },
};

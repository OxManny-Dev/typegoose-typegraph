import { Document } from 'mongoose';
import {
  IAccountDocument,
  ICrewDocument,
  IEmployeeDocument,
  IFieldDocument,
  IJobDocument,
  IRanchDocument,
} from '..';

export interface IJobLogDocument extends Document {
  _id: string;
  pay: number;
  pieces: number;
  originalTimeIn: string;
  originalTimeOut?: string;
  timeIn: string;
  timeOut: string;
  account: IAccountDocument;
  crew: ICrewDocument;
  employee: IEmployeeDocument;
  field: IFieldDocument;
  job: IJobDocument;
  ranch: IRanchDocument;
}

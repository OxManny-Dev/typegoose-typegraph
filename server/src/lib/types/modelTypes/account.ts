import { Document } from 'mongoose';
import {
  ICrewDocument,
  IEmployeeDocument,
  IFieldDocument,
  IJobDocument,
  IJobLogDocument,
  IRanchDocument,
} from '..';

export interface IAccountDocument extends Document {
  _id: string;
  name: string;
  admin: IEmployeeDocument;
  crews: ICrewDocument[];
  employees: IEmployeeDocument[];
  fields: IFieldDocument[];
  jobs: IJobDocument[];
  jobLogs: IJobLogDocument[];
  ranches: IRanchDocument[];
}

/* Tags with Gql are what we return to the user
* The error makes it easier for us to throw custom errors to display
*/
export interface GqlAccount {
  _id?: string;
  name?: string;
  admin?: IEmployeeDocument;
  crews?: ICrewDocument[];
  employees?: IEmployeeDocument[];
  fields: IFieldDocument[];
  jobs?: IJobDocument[];
  jobLogs?: IJobLogDocument[];
  ranches?: IRanchDocument[];
}

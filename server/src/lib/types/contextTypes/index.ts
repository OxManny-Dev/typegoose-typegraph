import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { ReturnModelType } from '@typegoose/typegoose';
import {
  IAccountDocument,
  ICrewDocument,
  IFieldDocument,
  IJobDocument,
  IRanchDocument,
  IJobLogDocument,
  IEmployeeDocument,
} from '..';
import { Employee } from '../../../graphQl/Entities/Employee';
import { Account } from '../../../graphQl/Entities/Account';

/*
* These are meant to be used for the context Object
* This allows us to have autoCompletion on the context object
*/

export interface BuildAuthContext {
  logout: () => Promise<void>;
  isAuthenticated: () => boolean;
  getUser: () => Model<IEmployeeDocument> | undefined;
}

/*
* Every Model we're doing to add on the context object should be added here
* You must create a ResolverInterface for context object
* to get auto completion in your resolver
*/

// export interface Models {
//   db: {
//     Account: Model<IAccountDocument>;
//     Crew: Model<ICrewDocument>;
//     Field: Model<IFieldDocument>;
//     Job: Model<IJobDocument>;
//     JobLog: Model<IJobLogDocument>,
//     Ranch: Model<IRanchDocument>;
//     Employee: Model<IEmployeeDocument>,
//   }
// }

export interface NewModels {
  EmployeeModel: ReturnModelType<typeof Employee> & Employee;
  AccountModel: ReturnModelType<typeof Account> & Account;
}

/*
* This is the actually context Object we will be using
* for the context parameter in the resolver's parameters
*/

export interface Context extends NewModels {
  req: Request;
  res: Response;
}

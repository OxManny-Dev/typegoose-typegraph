import {
  Model,
  model,
  Schema,
} from 'mongoose';

import { IAccountDocument } from '../../lib/types/modelTypes';

const AccountSchema: Schema<IAccountDocument> = new Schema<IAccountDocument>({
  name: String,
  admin: { type: Schema.Types.ObjectId, ref: 'Employee' },
  crews: [{ type: Schema.Types.ObjectId, ref: 'Crew' }],
  employees: [{ type: Schema.Types.ObjectId, ref: 'Employee' }],
  fields: [{ type: Schema.Types.ObjectId, ref: 'Field' }],
  jobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
  jobLogs: [{ type: Schema.Types.ObjectId, ref: 'JobLog' }],
  ranches: [{ type: Schema.Types.ObjectId, ref: 'Ranch' }],
});

export const Account: Model<IAccountDocument> = model<IAccountDocument>('Account', AccountSchema);

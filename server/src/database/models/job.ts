import {
  model,
  Model,
  Schema,
} from 'mongoose';

import { IJobDocument } from '../../lib/types/modelTypes';

const JobSchema: Schema<IJobDocument> = new Schema<IJobDocument>({
  name: String,
  pay: Number,
  pieces: Number,
  account: { type: Schema.Types.ObjectId, ref: 'Account' },
  crews: [{ type: Schema.Types.ObjectId, ref: 'Crew' }],
  employees: [{ type: Schema.Types.ObjectId, ref: 'Employee' }],
  fields: [{ type: Schema.Types.ObjectId, ref: 'Field' }],
  jobLogs: [{ type: Schema.Types.ObjectId, ref: 'JobLog' }],
  ranches: [{ type: Schema.Types.ObjectId, ref: 'Ranch' }],
});

export const Job: Model<IJobDocument> = model<IJobDocument>('Job', JobSchema);

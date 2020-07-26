import {
  model,
  Model,
  Schema,
} from 'mongoose';

import { IRanchDocument } from '../../lib/types/modelTypes';

const RanchSchema: Schema<IRanchDocument> = new Schema<IRanchDocument>({
  name: String,
  account: { type: Schema.Types.ObjectId, ref: 'Account' },
  crews: [{ type: Schema.Types.ObjectId, ref: 'Crew' }],
  employees: [{ type: Schema.Types.ObjectId, ref: 'Employee' }],
  fields: [{ type: Schema.Types.ObjectId, ref: 'Field' }],
  jobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
  jobLogs: [{ type: Schema.Types.ObjectId, ref: 'JobLog' }],
});

export const Ranch: Model<IRanchDocument> = model<IRanchDocument>('Ranch', RanchSchema);

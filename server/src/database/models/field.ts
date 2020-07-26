import {
  model,
  Model,
  Schema,
} from 'mongoose';

import { IFieldDocument } from '../../lib/types/modelTypes';

const FieldSchema: Schema<IFieldDocument> = new Schema<IFieldDocument>({
  name: String,
  account: { type: Schema.Types.ObjectId, ref: 'Account' },
  crews: [{ type: Schema.Types.ObjectId, ref: 'Crew' }],
  employees: [{ type: Schema.Types.ObjectId, ref: 'Employee' }],
  jobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
  jobLogs: [{ type: Schema.Types.ObjectId, ref: 'JobLog' }],
  ranch: { type: Schema.Types.ObjectId, ref: 'Ranch' },
});

export const Field: Model<IFieldDocument> = model<IFieldDocument>('Field', FieldSchema);

import {
  Model,
  model,
  Schema,
} from 'mongoose';

import { IJobLogDocument } from '../../lib/types/modelTypes';

const JobLogSchema: Schema<IJobLogDocument> = new Schema<IJobLogDocument>({
  logType: {
    type: String,
    enum: ['MANAGER', 'INPUT_USER', 'FIELD_USER', 'SETUP_USER', 'WORKER'],
  },
  pay: Number,
  pieces: Number,
  originalTimeIn: {
    type: Date,
    default: Date.now(),
  },
  originalTimeOut: {
    type: Date,
  },
  timeIn: {
    type: Date,
    default: Date.now(),
  },
  timeOut: Date,
  account: { type: Schema.Types.ObjectId, ref: 'Account' },
  crew: { type: Schema.Types.ObjectId, ref: 'Crew' },
  employee: { type: Schema.Types.ObjectId, ref: 'User' },
  field: { type: Schema.Types.ObjectId, ref: 'Field' },
  job: { type: Schema.Types.ObjectId, ref: 'Job' },
  ranch: { type: Schema.Types.ObjectId, ref: 'Ranch' },
});

export const JobLog: Model<IJobLogDocument> = model<IJobLogDocument>('JobLog', JobLogSchema);

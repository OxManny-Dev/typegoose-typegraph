import {
  model,
  Model,
  Schema,
} from 'mongoose';
import { ICrewDocument } from '../../lib/types/modelTypes';

const CrewSchema: Schema<ICrewDocument> = new Schema<ICrewDocument>({
  crewName: String,
  account: { type: Schema.Types.ObjectId, ref: 'Account' },
  crewMembers: [{ type: Schema.Types.ObjectId, ref: 'Employee' }],
  jobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
  jobLogs: [{ type: Schema.Types.ObjectId, ref: 'JobLog' }],
  fields: [{ type: Schema.Types.ObjectId, ref: 'Field' }],
  ranches: [{ type: Schema.Types.ObjectId, ref: 'Ranch' }],
});

export const Crew: Model<ICrewDocument> = model<ICrewDocument>('Crew', CrewSchema);

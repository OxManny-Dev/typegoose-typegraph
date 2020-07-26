import { IResolvers } from 'apollo-server-express';
import {
  Context,
  IJobLogDocument,
} from '../../../lib/types';
import { authorize } from '../../../lib/utils/auth';

export const jobLogResolvers: IResolvers = {
  Query: {
    jobLog: async (
      _root: undefined,
      id: string,
      { db: { JobLog } }: Context,
    ): Promise<IJobLogDocument | null> => {
      let jobLog;
      try {
        jobLog = await JobLog.findById(id);
      } catch (e) {
        console.log(e);
        throw new Error(e);
      }
      console.log(jobLog);
      return jobLog || null;
    },
    jobLogs: async (
      _root: undefined,
      _args: undefined,
      { req, db: { JobLog, Employee } }: Context,
    ) => {
      // const authorizedEmployee = await authorize(Employee, req);
      try {
        return await JobLog.find().populate('Employee');
      } catch (e) {
        console.log(e);
        throw new Error(e);
      }
    },
  },
  Mutation: {
    CreateJobLog: async (
      _root: undefined,
      _args: undefined,
      { req, db: { Employee, JobLog } }: Context,
    ) => {
      // const user = authorize
      let jobLog;
      const authorizedEmployee = await authorize(Employee, req);
      if (authorizedEmployee) {
        try {
          jobLog = await new JobLog({
            pieces: Math.round(Math.random() * 10 + 1),
            pay: Math.round(Math.random() * 10 + 1),
            user: authorizedEmployee,
          }).save();
        } catch (e) {
          throw new Error(e);
        }
      }
      return jobLog;
    },
  },
};

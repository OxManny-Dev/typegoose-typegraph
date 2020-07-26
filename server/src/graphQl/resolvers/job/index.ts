import { IResolvers, AuthenticationError } from 'apollo-server-express';
import {
  AddJobInput,
  Context,
  IJobDocument,
} from '../../../lib/types';
import { authorize } from '../../../lib/utils/auth';

export const jobResolvers: IResolvers = {
  Query: {
    job: async (
      _root: undefined,
      id: string,
      { db: { Job, Employee } }: Context,
    ) => {
      let job;
      try {
        job = await Job.findById(id);
      } catch (e) {
        throw new Error(e);
      }
      return job || null;
    },
    jobs: async (
      _root: undefined,
      _args: undefined,
      { req, db: { Account, Employee, Job } }: Context,
    ): Promise<IJobDocument[] | null> => {
      let account;
      let authorizedEmployee;
      let jobs;
      try {
        authorizedEmployee = await authorize(Employee, req);
      } catch (e) {
        throw new AuthenticationError(e);
      }

      if (authorizedEmployee) {
        account = await Account.findById(authorizedEmployee.account);
      } else {
        throw new Error('No account found for user');
      }
      if (account) {
        jobs = await Job.find({ account }).populate('account');
        return jobs;
      }
      return null;
    },
  },
  Mutation: {
    CreateJob: async (
      _root: undefined,
      { input: { name } }: AddJobInput,
      { req, db: { Account, Employee, Job } }: Context,
    ): Promise<IJobDocument | null> => {
      let account;
      let authorizedEmployee;
      let job;
      console.log('Creating Job');
      try {
        authorizedEmployee = await authorize(Employee, req);
      } catch (e) {
        console.log('Authorization error');
        throw new Error(e);
      }

      if (authorizedEmployee) {
        try {
          account = await authorizedEmployee.getEmployeeAccount();
        } catch (e) {
          throw new Error(e);
        }
      }

      if (account) {
        try {
          job = await new Job({ account, name })
            .populate('account')
            .save();
          account.jobs.push(job);
          await account.save();
          return job;
        } catch (e) {
          throw new Error(e);
        }
      }
      return null;
    },
  },
};

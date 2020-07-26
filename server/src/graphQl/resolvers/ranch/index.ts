import { IResolvers, AuthenticationError } from 'apollo-server-express';
import {
  AddRanchInput, Context, GqlRanch, IRanchDocument,
} from '../../../lib/types';
import { authorize } from '../../../lib/utils/auth';

export const ranchResolvers: IResolvers = {
  Query: {
    ranch: async (
      _root: undefined,
      id: string,
      { req, db: { Ranch, Employee, Account } }: Context,
    ) => {
      let authorizedEmployee;
      let account;
      /* look for authorized admin */
      try {
        authorizedEmployee = await authorize(Employee, req);
      } catch (e) {
        throw new Error(e);
      }

      /* Check for account if admin is auth */
      if (authorizedEmployee) {
        try {
          account = await Account.findOne({ admin: authorizedEmployee }).populate('ranches');
        } catch (e) {
          console.log(e);
          throw new Error('No account found');
        }
      }

      if (account) {
        return account.ranches.find((ranch) => ranch.id === id);
      }
    },
    ranches: async (
      _root: undefined,
      _args: undefined,
      { req, db: { Employee, Account, Ranch } } : Context,
    ): Promise<GqlRanch[] | null> => {
      let authorizedEmployee;
      let account;
      /* look for authorized admin */
      try {
        authorizedEmployee = await authorize(Employee, req);
      } catch (e) {
        console.log(e);
        throw new Error(e);
      }

      /* Check for account if admin is auth */
      if (authorizedEmployee) {
        try {
          account = await Account.findOne({ admin: authorizedEmployee }).populate('ranches');
        } catch (e) {
          console.log(e);
          throw new Error('No account found');
        }
      } else {
        throw new AuthenticationError('You must be authorized to do that');
      }

      if (account) {
        const ranches = await Ranch.find({ account }).populate('account');
        console.log(ranches);
        return ranches;
      }
      return null;
    },
  },
  Mutation: {
    AddRanch: async (
      _root: undefined,
      { input: { name } }: AddRanchInput,
      { req, db: { Ranch, Employee, Account } }: Context,
    ): Promise<IRanchDocument | null> => {
      let authorizedEmployee;
      let ranch;
      let account;
      /* look for authorized admin */
      try {
        authorizedEmployee = await authorize(Employee, req);
      } catch (e) {
        console.log('hit');
        throw new Error(e);
      }

      /* Check for account if admin is auth */
      if (authorizedEmployee) {
        try {
          account = await Account.findOne({ admin: authorizedEmployee });
        } catch (e) {
          console.log('no account');
          throw new Error('No account found');
        }
      }

      if (account) {
        try {
          ranch = await new Ranch({ account, name }).populate('account').save();
          account.ranches.push(ranch);
          await account.save();
          console.log(ranch);
          return ranch;
        } catch (e) {
          throw new Error(e);
        }
      }
      return null;
    },
  },
};

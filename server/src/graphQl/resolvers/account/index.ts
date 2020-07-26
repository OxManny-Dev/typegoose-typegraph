import { IResolvers, ForbiddenError } from 'apollo-server-express';
import {
  IAccountDocument,
  GqlAccount,
} from '../../../lib/types/modelTypes';
import { Context } from '../../../lib/types/contextTypes';
import { authorize } from '../../../lib/utils/auth';

export const accountResolvers: IResolvers = {
  Query: {
    account: async (
      _root: undefined,
      id: string,
      { req, db: { Account, Employee } } : Context,
    ): Promise<GqlAccount | null> => {
      let authorizedEmployee;
      let account;
      try {
        authorizedEmployee = await authorize(Employee, req);
      } catch (e) {
        console.log(e);
        throw new Error(e);
      }
      if (authorizedEmployee) {
        try {
          account = await Account.findOne({ admin: authorizedEmployee });
        } catch (e) {
          throw new Error('No account found with that user');
        }
      } else {
        throw new ForbiddenError('You must be authorized to do that');
      }
      if (!account) {
        throw new ForbiddenError('No account found that belongs to this user');
      }
      return account;
    },
    accounts: async (
      _root: undefined,
      _args: undefined,
      { db: { Account } } : Context,
    ) => {
      console.log('hit');
      try {
        return await Account.find();
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};

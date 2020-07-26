import { IResolvers } from 'apollo-server-express';
import { Context, IFieldDocument } from '../../../lib/types';
import { authorize } from '../../../lib/utils/auth';

export const fieldResolvers: IResolvers = {
  Query: {
    field: async (
      _root: undefined,
      id: string,
      { req, db: { Employee, Field, Account } }: Context,
    ): Promise<IFieldDocument | null> => {
      let authorizedEmployee;
      let account;
      let field;
      /* look for authorized user */
      try {
        authorizedEmployee = await authorize(Employee, req);
      } catch (e) {
        console.log(e);
        throw new Error(e);
      }

      /* Check for account if user is auth */
      if (authorizedEmployee) {
        try {
          account = await Account.findOne({ admin: authorizedEmployee }).populate('fields');
        } catch (e) {
          throw new Error('No account found');
        }
      }

      if (account) {
        field = await Field.findById(id);
      }

      if (field) {
        return field;
      }
      return null;
    },
  },
};

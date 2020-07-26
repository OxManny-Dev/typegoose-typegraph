import { IResolvers } from 'apollo-server-express';
import { CreateCrewInput, ICrewDocument } from '../../../lib/types/modelTypes';
import { authorize } from '../../../lib/utils/auth';
import { Context } from '../../../lib/types';

export const crewResolvers: IResolvers = {
  Query: {
    crews: async (
      _root: undefined,
      _args: undefined,
      { req, db: { Account, Crew, Employee } }: Context,
    ): Promise<ICrewDocument[] | null> => {
      let authorizedEmployee;
      let crews;
      let account;

      try {
        authorizedEmployee = await authorize(Employee, req);
      } catch (e) {
        throw new Error(e);
      }

      if (authorizedEmployee) {
        try {
          account = await Account.findById(authorizedEmployee.account);
        } catch (e) {
          throw new Error(e);
        }
      }

      if (account) {
        try {
          crews = await Crew.find({ account });
          console.log(crews);
          return crews;
        } catch (e) {
          throw new Error(e);
        }
      }

      return null;
    },
  },
  Mutation: {
    CreateCrew: async (
      _root: undefined,
      { input: { crewName } }: CreateCrewInput,
      { req, db: { Account, Crew, Employee } }: Context,
    ): Promise<ICrewDocument | null> => {
      let authorizedEmployee;
      let newCrew;
      let account;

      try {
        authorizedEmployee = await authorize(Employee, req);
      } catch (e) {
        throw new Error(e);
      }

      if (authorizedEmployee) {
        try {
          account = await Account.findById(authorizedEmployee.account);
        } catch (e) {
          throw new Error(e);
        }
      }

      if (account) {
        try {
          newCrew = await new Crew({ account, crewName }).save();
          account.crews.push(newCrew);
          await account.save();
          return newCrew;
        } catch (e) {
          throw new Error(e);
        }
      }
      return null;
    },
  },
};

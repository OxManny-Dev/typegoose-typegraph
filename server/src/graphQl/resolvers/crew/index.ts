import {
  Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware,
} from 'type-graphql';

import { Context } from '../../../lib/types';

import { AuthenticateEmployee } from '../../gqlMiddleware/authenticate';
import { CreateCrewInput } from '../../inputTypes/createInput';

import { Crew as GqlCrew } from '../../Entities';

@Resolver((_of) => GqlCrew)
export class CrewResolver {
  @Query((_returns) => [GqlCrew])
  @UseMiddleware(AuthenticateEmployee)
  async fetchCrews(
    @Ctx() { req, EmployeeModel }: Context,
  ): Promise<GqlCrew[] | null> {
    try {
      const employeeAccount = await EmployeeModel.getAuthEmployeeAccount(req.signedCookies.loggedInEmployee);
      if (employeeAccount) {
        return (await employeeAccount.getCrews()).crews;
      }
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
    return null;
  }

  @Mutation((_returns) => GqlCrew)
  @UseMiddleware(AuthenticateEmployee)
  async createCrew(
    @Arg('createCrewInput') createCrewInput: CreateCrewInput,
    @Ctx() { EmployeeModel, req }: Context,
  ): Promise<GqlCrew | null> {
    try {
      const employeeAccount = await EmployeeModel.getAuthEmployeeAccount(req.signedCookies.loggedInEmployee);
      if (employeeAccount) {
        return (await employeeAccount.getCrews()).crews;
      }
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
    return null;
  }
}

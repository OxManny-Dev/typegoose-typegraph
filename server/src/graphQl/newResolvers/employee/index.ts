import {
  Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root,
} from 'type-graphql';

import faker from 'faker';
import { Context } from '../../../lib/types';
import { Account as GqlAccount, Employee as GqlEmployee } from '../../Entities';

import { SignUpInput } from '../../inputTypes/employeeInput';

@Resolver((_of) => GqlEmployee)
export class EmployeeResolver {
  @Query((_returns) => [GqlEmployee])
  async employees(
    @Ctx() { EmployeeModel }: Context,
  ): Promise<GqlEmployee[] | null> {
    // fake async in this example
    console.log(EmployeeModel);
    try {
      const employees = await EmployeeModel.find()
        .populate({
          path: 'account',
          populate: { path: 'admin' },
        })
        .exec();

      if (employees) {
        return employees;
      }
      return null;
    } catch (e) {
      throw new Error(e);
    }
  }

  @Mutation((_returns) => GqlEmployee)
  async signUpForAccount(
    // You must use a single string for Arg
    @Arg('signUpInput') signUpInput: SignUpInput,
    @Ctx() { EmployeeModel, AccountModel }: Context,
  ): Promise<GqlEmployee | null> {
    let newEmployee;
    try {
      newEmployee = await new EmployeeModel({ ...signUpInput, firstName: 'Manny' }).save();
      newEmployee.account = await new AccountModel({ admin: newEmployee.id, name: faker.random.word() }).save();
      await newEmployee.save();
    } catch (e) {
      throw new Error(e);
    }

    if (newEmployee) {
      return newEmployee;
    }

    return null;
  }

  @FieldResolver()
  id(@Root() currentEmployee: GqlEmployee) {
    return currentEmployee._id.toString();
  }

  @FieldResolver()
  async account(
    @Root() parent,
    @Ctx() { AccountModel }: Context,
  ): Promise<GqlAccount | null> {
    let account: GqlAccount;
    try {
      if (parent.account) {
        account = await AccountModel.findById(parent.account._id.toString()).populate('admin');
        return account;
      }
    } catch (e) {
      throw new Error(e);
    }
  }
}

import 'reflect-metadata';
import { ObjectId } from 'mongodb';

import {
  Resolver, Query, FieldResolver, Arg, Root, Mutation, Ctx, InputType, Field,
} from 'type-graphql';

import { MaxLength, Length } from 'class-validator';
import faker from 'faker';
import { Context } from '../../../lib/types';
import { Employee as GqlEmployee } from '../../Entities/Employee';
import employee from '../../typeDefs/types/employee';

@InputType()
export class SignUpInput implements Partial<GqlEmployee> {
  @Field((type) => String)
  public email?: string;

  @Field((type) => String)
  public password?: string;
}

@Resolver((of) => GqlEmployee)
export class EmployeeResolver {
  @Query((returns) => GqlEmployee)
  // eslint-disable-next-line class-methods-use-this
  async employees (@Ctx('Employee Collection') { EmployeeModel, AccountModel }: Context) {
    // fake async in this example
    return EmployeeModel.findOne({ name: 'Manny' });
  }

  @Mutation((returns) => GqlEmployee)
  async signUpForAccount (
    // You must use a single string for Arg
    @Arg('signUpInput') signUpInput: SignUpInput,
    @Ctx() { EmployeeModel, AccountModel }: Context,
  ): Promise<GqlEmployee | null> {
    let newEmployee;
    try {
      newEmployee = await new EmployeeModel({ ...signUpInput, firstName: 'Manny' }).save();
      newEmployee.account = await new AccountModel({ admin: newEmployee._id, name: faker.random.word() }).save();
      await newEmployee.save();
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }

    if (newEmployee) {
      return newEmployee;
    }

    return null;
  }

  @FieldResolver()
  id (@Root() currentEmployee: GqlEmployee) {
    return currentEmployee._id.toString();
  }

  @FieldResolver()
  async account (@Root() currentEmployee: GqlEmployee, @Ctx() { AccountModel }: Context) {
    try {
      return await AccountModel.findById(currentEmployee.account).populate('admin');
    } catch (e) {
      throw new Error(e);
    }
  }
}

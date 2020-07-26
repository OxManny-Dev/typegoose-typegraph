import 'reflect-metadata';
import { ObjectId } from 'mongodb';

import {
  Resolver, Query, FieldResolver, Arg, Root, Mutation, Ctx, InputType, Field,
} from 'type-graphql';

import { MaxLength, Length } from 'class-validator';
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
  async employees(@Ctx('Employee Collection') { EmployeeModel }: Context) {
    // fake async in this example
    return EmployeeModel.findOne({ name: 'Manny' });
  }

  @Mutation((returns) => GqlEmployee)
  async signUpForAccount(
    // You must use a single string for Arg
    @Arg('signUpInput') signUpInput: SignUpInput,
    @Ctx() { EmployeeModel }: Context,
  ): Promise<GqlEmployee | null> {
    try {
      const newEmployee = new EmployeeModel({ ...signUpInput, firstName: 'Manny' });
      console.log(newEmployee.id);
      return newEmployee || null;
    } catch (e) {
      throw new Error(e);
    }
  }

  @FieldResolver()
  id(@Root() currentEmployee: GqlEmployee) {
    return currentEmployee._id.toString();
  }
}

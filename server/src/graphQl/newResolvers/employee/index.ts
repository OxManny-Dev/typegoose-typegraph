import {
  Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root,
} from 'type-graphql';
import { validate, ValidationError } from 'class-validator';

import crypto from 'crypto';
import faker from 'faker';
import { Context } from '../../../lib/types';
import { Account as GqlAccount, Employee as GqlEmployee } from '../../Entities';

import { SignUpInput } from '../../inputTypes/employeeInput';

const cookieOptions = {
  httpOnly: true,
  sameSite: true,
  signed: true,
  secure: process.env.NODE_ENV === 'development',
};

@Resolver((_of: void) => GqlEmployee)
export class EmployeeResolver {
  // Queries
  @Query((_returns: void) => [GqlEmployee])
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

  // Mutations
  @Mutation((_returns: void) => GqlEmployee)
  async signUp(
    // You must use a single string for Arg
    @Arg('signUpInput') signUpInput: SignUpInput,
    @Ctx() { EmployeeModel, AccountModel, res }: Context,
  ): Promise<GqlEmployee | null> {
    // Place holder variable for new employee
    let newEmployee;
    let errors: ValidationError[];
    const token = crypto.randomBytes(16).toString('hex');
    // Validate Inputs
    try {
      errors = await validate(signUpInput, { validationError: { target: false } });
    } catch (e) {
      throw new Error(e);
    }

    // Gets the error messages validate, takes each error Object
    // and combines all input errors into 1 string
    if (errors.length > 0) {
      console.log(errors);
      const messages: string[] = errors.map((error: ValidationError) => Object.values(error.constraints)).flat();
      throw new Error(messages.join(' '));
    }

    // Check if employee exists and if so, throw an error, otherwise create account
    try {
      newEmployee = await EmployeeModel.findOne({ email: signUpInput.email });
    } catch (e) {
      throw new Error(e);
    }

    if (newEmployee) {
      throw new Error('Account already exists. Please try a different email address');
    }
    try {
      newEmployee = await new EmployeeModel({ ...signUpInput, token }).save();
      newEmployee.account = await new AccountModel({ admin: newEmployee.id, name: faker.random.word() }).save();
      await newEmployee.save();
    } catch (e) {
      throw new Error(e);
    }

    // If there's an employee, create a cookie for him using id
    if (newEmployee) {
      res.cookie('loggedInEmployee', newEmployee._id, {
        ...cookieOptions,
        maxAge: 1000 * 60 * 60 * 24,
      });
      return newEmployee;
    }
    return null;
  }

  // @Mutation((_returns) => GqlEmployee)
  // async signIn

  @Mutation((_returns: void) => GqlEmployee)
  signOut(@Ctx() { res }: Context) {
    try {
      res.clearCookie('loggedInEmployee', cookieOptions);
      return { logOut: true };
    } catch (error) {
      throw new Error(`Failed to log out: ${error}`);
    }
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

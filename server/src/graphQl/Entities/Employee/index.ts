import {
  getModelForClass, pre, prop as Property, Ref, ReturnModelType,
} from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import { Account, AccountModel, Job } from '..';
// import { Schema } from 'mongoose';

import { EmployeeRoleType } from '../../../lib/types/modelTypes';

@ObjectType({ description: 'A User or Employee of the program' })
@pre<Employee>('save', async function (next) {
  // gets access to the user model that is currently being saved
  const user = this;
  if (user.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt();
      // overwrite the plain text password with our hash
      user.password = await bcrypt.hash(user.password, salt);
      // Finally call save
      next();
    } catch (e) {
      // Call save with an error
      next(e);
    }
  }
  next();
})
export class Employee {
  // Any field we don't decorate with @Field here is for this class only
  readonly _id!: ObjectId;

  @Field({ nullable: true })
  id?: string;

  @Property({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  @Field({ nullable: true })
  email?: string;

  @Property({
    trim: true,
    get(val) {
      return val;
    },
    set(val) {
      return val.charAt(0).toUpperCase() + val.slice(1);
    },
  })
  @Field({ nullable: true })
  firstName?: string;

  @Property({
    trim: true,
    get(val) {
      return val;
    },
    set(val) {
      return val.charAt(0).toUpperCase() + val.slice(1);
    },
  })
  @Field({ nullable: true })
  lastName?: string;

  @Property({ enum: EmployeeRoleType })
  @Field({ nullable: true })
  role?: string;

  @Property()
  password!: string;

  @Property()
  @Field({ nullable: true })
  token?: string;

  @Property({ ref: 'Account' })
  @Field((_type: void) => Account, { nullable: true })
  account?: Ref<Account>;

  @Property({ ref: 'Job', default: [] })
  @Field((_returns) => [Job], { nullable: true })
  jobs?: Ref<Job>[];

  @Field({ nullable: true })
  logOut?: boolean;

  /*
  *
  * END OF PROPERTIES FOR GQL AND MONGOOSE
  *
  *
  * */

  // Model methods
  async comparePassword(candidatePassword: string): Promise<boolean> {
    const employee = this;
    try {
      const isMatch: boolean = await bcrypt.compare(candidatePassword, employee.password);
      return Promise.resolve(isMatch);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  // Static class methods
  // Returns the LoggedIn Users Account
  public static async getAuthEmployeeAccount(this: ReturnModelType<typeof Employee>, id: string) {
    let authenticatedEmployee;
    let account;
    try {
      authenticatedEmployee = await this.findById(id).populate('account');
      console.log('authenticated', authenticatedEmployee);
    } catch (e) {
      throw new Error(e);
    }
    if (!authenticatedEmployee) {
      throw new Error('Error in getAuthenticatedEmployee');
    }
    try {
      account = await AccountModel.findById(authenticatedEmployee.account._id);
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
    if (!account) {
      throw new Error('Error: Error in getting account. You must have an account to do that');
    }
    console.log('account', account);
    return account;
  }
  // Might be useful later account does have this method
  // async getEmployeeAccount () {
  //   try {
  //     return await AccountModel.findById(this.account).populate({ path: 'admin', populate: { path: 'account' } });
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }
}

export const EmployeeModel = getModelForClass(Employee);

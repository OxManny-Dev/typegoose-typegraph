import { prop as Property, getModelForClass, Ref, pre } from '@typegoose/typegoose';
import { ObjectType, Field } from 'type-graphql';
import { ObjectId } from 'mongodb';
import { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { Account, AccountModel } from '../Account';

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

  @Field()
  id!: string;

  @Property({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  @Field({ nullable: true })
  public email!: string;

  @Property({
    trim: true,
    get (val) {
      return val;
    },
    set (val) {
      return val.charAt(0).toUpperCase() + val.slice(1);
    },
  })
  @Field({ nullable: true })
  public firstName?: string;

  @Property({
    trim: true,
    get (val) {
      return val;
    },
    set (val) {
      return val.charAt(0).toUpperCase() + val.slice(1);
    },
  })
  @Field({ nullable: true })
  public lastName?: string;

  @Property()
  public password!: string;

  @Property()
  @Field({ nullable: true })
  public token?: string;

  @Property({ ref: Account, type: Schema.Types.ObjectId })
  @Field((_type: void) => Account!)
  public account!: Ref<Account>;

  public async comparePassword (candidatePassword: string): Promise<boolean> {
    const employee = this;
    try {
      const isMatch: boolean = await bcrypt.compare(candidatePassword, employee.password);
      return Promise.resolve(isMatch);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  // Might be useful later
  // public async getEmployeeAccount () {
  //   try {
  //     return await AccountModel.findById(this.account).populate({ path: 'admin', populate: { path: 'account' } });
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }
}

export const EmployeeModel = getModelForClass(Employee);

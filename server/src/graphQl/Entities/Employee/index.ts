import { prop as Property, getModelForClass, Ref } from '@typegoose/typegoose';
import { ObjectType, Field } from 'type-graphql';
import { ObjectId } from 'mongodb';
import { Account } from '../Account';

@ObjectType({ description: 'A User or Employee of the program' })
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
    get(val) {
      return val;
    },
    set(val) {
      return val.charAt(0).toUpperCase() + val.slice(1);
    },
  })
  @Field({ nullable: true })
  public firstName?: string;

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
  public lastName?: string;

  @Property()
  public password!: string;

  @Property()
  @Field({ nullable: true })
  public token?: string;

  @Property({ ref: Account })
  @Field((_type: void) => Account!)
  public account!: Ref<Account>;
}

export const EmployeeModel = getModelForClass(Employee);

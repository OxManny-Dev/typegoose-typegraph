import { prop as Property, getModelForClass, Ref } from '@typegoose/typegoose';
import { ObjectType, Field } from 'type-graphql';
import { ObjectId } from 'mongodb';
import { Account } from '../Account';

@ObjectType()
export class Employee {
  // Any field we don't decorate with @Field will be fine here
  readonly _id!: ObjectId;

  @Field()
  id!: string;

  @Property()
  @Field({ nullable: true })
  firstName?: string;

  @Property()
  @Field({ nullable: true })
  public lastName?: string;

  @Property({ required: true })
  @Field({ nullable: true })
  public email!: string;

  @Property()
  public password!: string;

  @Property({ ref: Account, type: Account })
  @Field((type) => Account!)
  account!: Ref<Account>;
}

export const EmployeeModel = getModelForClass(Employee);

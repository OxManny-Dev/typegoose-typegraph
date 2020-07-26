import 'reflect-metadata';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';
import { ObjectType, Field } from 'type-graphql';
import { ObjectId } from 'mongodb';

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
}

export const EmployeeModel = getModelForClass(Employee);

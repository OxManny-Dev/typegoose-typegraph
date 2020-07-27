import {
  prop as Property, getModelForClass, Ref, ReturnModelType, DocumentType,
} from '@typegoose/typegoose';
import { ObjectType, Field } from 'type-graphql';
import { ObjectId } from 'mongodb';

import { Account, Employee } from '..';

@ObjectType({ description: 'The job model' })
export class Job {
  readonly _id!: ObjectId;

  @Field({ nullable: true })
  id?: string;

  @Property({ required: true, unique: true })
  @Field({ nullable: true })
  jobName: string;

  @Property({ ref: 'Employee', default: [] })
  @Field(() => [Employee])
  employees?: Ref<Employee>[];

  @Property({ ref: 'Account', required: true })
  @Field((_returns) => Account, { nullable: true })
  account?: Ref<Account>

  @Property()
  @Field(() => Number)
  pay? : number;

  @Property()
  @Field(() => Number)
  pieces? : number;
}

export const JobModel = getModelForClass(Job);

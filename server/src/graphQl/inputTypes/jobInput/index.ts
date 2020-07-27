import { Field, InputType } from 'type-graphql';
import {
  Length,
  IsEmail,
  IsString,
  IsEnum,
} from 'class-validator';

import { Job as GqlJob } from '../../Entities';

@InputType()
export class CreateJobInput implements Partial<GqlJob> {
  @Field()
  @IsString()
  jobName!: string;
}

import { Field, InputType } from 'type-graphql';
import {
  IsString,
} from 'class-validator';

import { Job as GqlJob } from '../../Entities';

@InputType()
export class CreateJobInput implements Partial<GqlJob> {
  @Field()
  @IsString()
  jobName!: string;
}

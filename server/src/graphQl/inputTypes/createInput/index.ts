import { Field, InputType } from 'type-graphql';
import {
  IsString,
} from 'class-validator';

import { Crew as GqlCrew } from '../../Entities';

@InputType()
export class CreateCrewInput implements Partial<GqlCrew> {
  @Field({ nullable: true })
  @IsString()
  crewName?: string;
}
